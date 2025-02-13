import os
import cv2
import numpy as np
import json
import time
import platform
from pyzbar.pyzbar import decode, ZBarSymbol
from qr_snack.database import load_participants, save_participants, QR_FOLDER

def scan_qr():
    """Scans QR codes using webcam and updates participant data."""

    if not os.path.exists(QR_FOLDER) or not os.listdir(QR_FOLDER):
        print("⚠️ No QR codes found! Please generate QR codes before scanning.")
        return

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("❌ Error: Could not access the camera.")
        return

    scanned_ids = set()
    waiting_for_clear = False
    participants = load_participants()

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("❌ Error: Failed to capture image.")
                break

            decoded_objects = decode(frame, symbols=[ZBarSymbol.QRCODE])

            if waiting_for_clear:
                if not decoded_objects:
                    waiting_for_clear = False
                else:
                    cv2.putText(frame, "Remove QR to scan next", (50, 150),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
                    cv2.imshow("QR Code Scanner", frame)
                    continue

            else:
                for obj in decoded_objects:
                    qr_data = obj.data.decode('utf-8')
                    print(f"📸 Scanned Data: {qr_data}")

                    try:
                        data = json.loads(qr_data)
                        participant_id = data["ID"]
                    except (json.JSONDecodeError, KeyError):
                        print("❌ Invalid QR format")
                        continue

                    for participant in participants:
                        if participant["ID"] == participant_id:
                            if participant["Snack_Received"] == "No":
                                participant["Snack_Received"] = "Yes"
                                save_participants(participants)
                                print(f"✅ Snacks given to {participant_id}")
                            else:
                                print(f"❌ {participant_id} already received!")

                            scanned_ids.add(participant_id)
                            waiting_for_clear = True
                            break
                    else:
                        print(f"❌ Invalid participant {participant_id}!")

            cv2.imshow("QR Code Scanner", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    scan_qr()
