import os
import shutil
from qr_snack.database import QR_FOLDER

def delete_qr_images():
    """Deletes all QR images from the QR folder."""
    if os.path.exists(QR_FOLDER):
        for file in os.listdir(QR_FOLDER):
            file_path = os.path.join(QR_FOLDER, file)
            try:
                if os.path.isfile(file_path):
                    os.remove(file_path)
            except Exception as e:
                print(f"❌ Error deleting {file_path}: {e}")
        
        print(f"✅ All QR images deleted from '{QR_FOLDER}'")
    else:
        print(f"⚠️ QR folder does not exist: '{QR_FOLDER}'")

if __name__ == "__main__":
    delete_qr_images()
