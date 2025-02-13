import os
import json
import qrcode
from qr_snack.database import load_participants, save_participants, QR_FOLDER

def generate_qr():
    """Generates QR codes for all participants and saves them."""

    participants = load_participants()

    if not participants:
        print("⚠️ No participants found! Please add participants before generating QR codes.")
        return

    if not os.path.exists(QR_FOLDER):
        os.makedirs(QR_FOLDER)

    updated_participants = []

    for participant in participants:
        if participant["QR_Code"].strip():
            print(f"✅ Skipping {participant['ID']} (QR Code already exists)")
        else:
            qr_data = json.dumps({"ID": participant["ID"], "Name": participant["Name"]})
            qr_filename = os.path.join(QR_FOLDER, f"QR_{participant['ID']}.png")

            qr = qrcode.make(qr_data)
            qr.save(qr_filename)

            participant["QR_Code"] = qr_filename
            participant["Snack_Received"] = "No"
            print(f"✅ Generated QR for {participant['ID']}")

        updated_participants.append(participant)

    save_participants(updated_participants)
    print(f"✅ All QR Codes have been generated & saved in '{QR_FOLDER}'.")

if __name__ == "__main__":
    generate_qr()
