import os
import csv

# Set the base directory (assumes this file is in Backend/qr_snack/)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Set paths for CSV file and QR image folder
CSV_FILE = os.path.join(BASE_DIR, "database-csv/participants.csv")
QR_FOLDER = os.path.join(BASE_DIR, "qr_img")

# Ensure the QR folder exists
if not os.path.exists(QR_FOLDER):
    os.makedirs(QR_FOLDER)

def load_participants():
    """Loads participant data from the CSV file. If the file is empty, return an empty list."""
    if not os.path.exists(CSV_FILE):
        return []  # 🔥 Fix: Return an empty list instead of default values

    with open(CSV_FILE, "r", newline="") as file:
        reader = csv.DictReader(file)
        participants = list(reader)

        if not participants:  # 🔥 Fix: If file is empty, do NOT return default participants
            return []

        return participants


def get_default_participants():
    """Returns default participant data."""
    return [
        {"ID": "P001", "Name": "John Doe", "QR_Code": "", "Snack_Received": "No"},
        {"ID": "P002", "Name": "Alice Smith", "QR_Code": "", "Snack_Received": "No"},
        {"ID": "P003", "Name": "Soivt Johnson", "QR_Code": "", "Snack_Received": "No"},
    ]

def save_participants(participants):
    """Saves participant data back to the CSV file, creates CSV if missing."""
    
    # Ensure the folder exists
    csv_folder = os.path.dirname(CSV_FILE)
    if not os.path.exists(csv_folder):
        os.makedirs(csv_folder)
        print(f"📂 Created missing folder: {csv_folder}")

    # Ensure the CSV file exists before writing
    if not os.path.exists(CSV_FILE):
        print("⚠️ CSV file missing! Creating a new one...")
        with open(CSV_FILE, "w", newline="") as file:
            writer = csv.DictWriter(file, fieldnames=["ID", "Name", "QR_Code", "Snack_Received"])
            writer.writeheader()

    # Now save the participants
    with open(CSV_FILE, "w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=["ID", "Name", "QR_Code", "Snack_Received"])
        writer.writeheader()
        writer.writerows(participants)
    print(f"✅ Participants saved in {CSV_FILE}")
