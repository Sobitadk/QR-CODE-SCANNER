import os
from qr_snack.delete_qr import delete_qr_images
from qr_snack.database import CSV_FILE

def delete_csv():
    """Deletes the participants CSV file completely and recreates an empty file with headers."""
    if os.path.exists(CSV_FILE):
        os.remove(CSV_FILE)  # Delete the CSV file
        print(f"🗑️ Deleted '{CSV_FILE}'.")

    # Recreate an empty CSV file with just headers
    with open(CSV_FILE, "w", newline="") as file:
        file.write("ID,Name,QR_Code,Snack_Received\n")  
        print("📂 Created a fresh 'participants.csv' with headers.")

def reset_all():
    """Fully resets the project: deletes QR images and clears CSV data."""
    
    print("🚮 Deleting all QR codes...")
    delete_qr_images()  # Removes all QR images

    print("🗑️ Deleting all participant data in CSV...")
    delete_csv()  # Clears CSV file completely

    print("✅ System is fully reset and ready for a new batch!")

if __name__ == "__main__":
    reset_all()
