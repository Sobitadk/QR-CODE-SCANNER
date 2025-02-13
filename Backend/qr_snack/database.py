import os
import csv

# Calculate the base directory (assumes this file is located at backend/qr_snack/)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_FILE = os.path.join(BASE_DIR, "participants.csv")
QR_FOLDER = os.path.join(BASE_DIR, "qr_img")

def load_participants():
    """
    Loads participant data from the CSV file.
    If the CSV file does not exist, returns default participant data.
    """
    if os.path.exists(CSV_FILE):
        with open(CSV_FILE, "r") as file:
            reader = csv.DictReader(file)
            return list(reader)
    else:
        # Default participant data if CSV does not exist
        return [
            {"ID": "P001", "Name": "John Doe", "QR_Code": "", "Snack_Received": "No"},
            {"ID": "P002", "Name": "Alice Smith", "QR_Code": "", "Snack_Received": "No"},
            {"ID": "P003", "Name": "Bob Johnson", "QR_Code": "", "Snack_Received": "No"},
        ]

def save_participants(participants):
    """
    Saves the participant data back to the CSV file.
    """
    fieldnames = ["ID", "Name", "QR_Code", "Snack_Received"]
    with open(CSV_FILE, "w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(participants)
