import os
import json
import qrcode
from .database import load_participants, save_participants, QR_FOLDER

def generate_qr():
    # Ensure the QR folder exists
    if not os.path.exists(QR_FOLDER):
        os.makedirs(QR_FOLDER)

    # Load participants data from CSV
    participants = load_participants()
    updated_participants = []

    for participant in participants:
        # If a QR code already exists, skip generation
        if participant["QR_Code"].strip():
            print(f"✅ Skipping {participant['ID']} (QR Code already exists)")
        else:
            # Create JSON data for the QR code
            qr_data = json.dumps({
                "ID": participant["ID"],
                "Name": participant["Name"]
            })
            # Define the QR code image filename and path
            qr_filename = os.path.join(QR_FOLDER, f"QR_{participant['ID']}.png")
            # Generate and save the QR code
            qr = qrcode.make(qr_data)
            qr.save(qr_filename)
            # Update participant info with the new QR code path
            participant["QR_Code"] = qr_filename
            participant["Snack_Received"] = "No"
            print(f"✅ Generated QR for {participant['ID']}")

        updated_participants.append(participant)

    # Save the updated participant data back to the CSV file
    save_participants(updated_participants)
    print(f"✅ All QR Codes have been generated & saved in '{QR_FOLDER}'.")

if __name__ == "__main__":
    generate_qr()
