from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import csv
import qrcode
import json
import shutil
import base64
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont  # Added for text overlay
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, "participants.csv")
QR_FOLDER = os.path.join(BASE_DIR, "qr_img")

class Participant(BaseModel):
    ID: str
    Name: str
    QR_Code: str = ""
    Snack_Received: str = "No"

def load_participants() -> List[dict]:
    if not os.path.exists(CSV_FILE):
        return []
    with open(CSV_FILE, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        return list(reader)

def save_participants(participants: List[dict]) -> None:
    fieldnames = ["ID", "Name", "QR_Code", "Snack_Received"]
    if not os.access(BASE_DIR, os.W_OK):
        raise HTTPException(status_code=500, detail="No write permission")
    with open(CSV_FILE, "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(participants)

# Helper function to add participant ID to QR code image
def add_id_to_qr(qr_image, participant_id):
    qr_with_text = qr_image.copy()
    draw = ImageDraw.Draw(qr_with_text)
    try:
        font = ImageFont.truetype("arial.ttf", 20)  # Use Arial, adjust size as needed
    except:
        font = ImageFont.load_default()  # Fallback if Arial isn’t available
    text_bbox = draw.textbbox((0, 0), participant_id, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    img_width, img_height = qr_with_text.size
    text_x = (img_width - text_width) // 2  # Center horizontally
    text_y = img_height - text_height - 10  # Position near bottom
    draw.text((text_x, text_y), participant_id, font=font, fill="black")
    return qr_with_text

@app.post("/participants", response_model=dict)
async def add_participant(participant: Participant):
    participants = load_participants()
    if any(p["ID"] == participant.ID for p in participants):
        raise HTTPException(status_code=400, detail="Participant ID already exists")
    participants.append(participant.dict())
    save_participants(participants)
    return {"message": "Participant added successfully"}

@app.post("/upload-csv", response_model=dict)
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files allowed")
    contents = await file.read()
    try:
        decoded_contents = contents.decode("utf-8")
        csv_reader = csv.DictReader(decoded_contents.splitlines())
        required_fields = {"ID", "Name", "QR_Code", "Snack_Received"}
        if not required_fields.issubset(csv_reader.fieldnames):
            raise HTTPException(status_code=400, detail="CSV must contain: ID, Name, QR_Code, Snack_Received")
        new_participants = list(csv_reader)
        existing_participants = load_participants()
        existing_ids = {p["ID"] for p in existing_participants}
        unique_participants = [p for p in new_participants if p["ID"] not in existing_ids]
        if not unique_participants:
            raise HTTPException(status_code=400, detail="No new participants to add")
        save_participants(existing_participants + unique_participants)
        return {"message": f"Added {len(unique_participants)} new participants"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing CSV: {str(e)}")

@app.get("/participants", response_model=List[Participant])
async def get_all_participants():
    participants = load_participants()
    return [Participant(**p) for p in participants]

@app.post("/reset-snack-data", response_model=dict)
async def reset_snack_data():
    participants = load_participants()
    for p in participants:
        p["Snack_Received"] = "No"
    save_participants(participants)
    return {"message": "Snack status reset successfully"}

@app.post("/delete-qr", response_model=dict)
async def delete_qr():
    if os.path.exists(QR_FOLDER):
        try:
            shutil.rmtree(QR_FOLDER)
            os.makedirs(QR_FOLDER)
            participants = load_participants()
            for p in participants:
                p["QR_Code"] = ""
            save_participants(participants)
            return {"message": "All QR codes deleted successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error deleting QR codes: {str(e)}")
    return {"message": "No QR codes to delete"}

@app.post("/delete-all", response_model=dict)
async def delete_all():
    try:
        if os.path.exists(QR_FOLDER):
            shutil.rmtree(QR_FOLDER)
            os.makedirs(QR_FOLDER)
        if os.path.exists(CSV_FILE):
            os.remove(CSV_FILE)
        return {"message": "System reset successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error resetting system: {str(e)}")

@app.post("/generate_qr", response_model=dict)
async def generate_qr(participant: dict):
    """Generate QR code for a single participant with ID overlay."""
    participant_id = participant.get("participant_id")
    if not participant_id:
        raise HTTPException(status_code=400, detail="participant_id required")
    
    participants = load_participants()
    participant_data = next((p for p in participants if p["ID"] == participant_id), None)
    if not participant_data:
        raise HTTPException(status_code=404, detail=f"Participant {participant_id} not found")
    
    if not os.path.exists(QR_FOLDER):
        os.makedirs(QR_FOLDER)
    
    qr_data = json.dumps({"ID": participant_id, "Name": participant_data["Name"]})
    qr_filename = os.path.join(QR_FOLDER, f"QR_{participant_id}.png")
    
    if not os.path.exists(qr_filename):
        qr = qrcode.make(qr_data)
        qr_with_id = add_id_to_qr(qr, participant_id)  # Add ID to QR image
        qr_with_id.save(qr_filename)
        participant_data["QR_Code"] = qr_filename
        save_participants(participants)
    
    with open(qr_filename, "rb") as image_file:
        qr_base64 = base64.b64encode(image_file.read()).decode("utf-8")
    qr_base64_url = f"data:image/png;base64,{qr_base64}"
    
    return {
        "message": f"QR code generated for {participant_id}",
        "qr_code_url": qr_base64_url,
        "filename": qr_filename
    }

@app.post("/generate_all_qr", response_model=dict)
async def generate_all_qr():
    """Generate QR codes for all participants with ID overlay."""
    participants = load_participants()
    if not participants:
        raise HTTPException(status_code=400, detail="No participants found")
    
    if not os.path.exists(QR_FOLDER):
        os.makedirs(QR_FOLDER)
    
    qr_codes = {}
    updated_participants = []
    
    for participant in participants:
        if participant["QR_Code"].strip():
            qr_codes[participant["ID"]] = participant["QR_Code"]
        else:
            qr_data = json.dumps({"ID": participant["ID"], "Name": participant["Name"]})
            qr_filename = os.path.join(QR_FOLDER, f"QR_{participant['ID']}.png")
            qr = qrcode.make(qr_data)
            qr_with_id = add_id_to_qr(qr, participant["ID"])  # Add ID to QR image
            qr_with_id.save(qr_filename)
            participant["QR_Code"] = qr_filename
            participant["Snack_Received"] = "No"
            
            with open(qr_filename, "rb") as image_file:
                qr_base64 = base64.b64encode(image_file.read()).decode("utf-8")
            qr_codes[participant["ID"]] = f"data:image/png;base64,{qr_base64}"
        
        updated_participants.append(participant)
    
    save_participants(updated_participants)
    return {
        "message": "QR codes generated for all participants",
        "qr_codes": qr_codes
    }