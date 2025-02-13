import os
import csv
from qr_snack.database import CSV_FILE, load_participants, save_participants

def add_participant():
    """Allows users to manually add new participants OR upload a CSV file."""
    
    while True:
        print("\n📌 Choose an option:")
        print("1️⃣ Manually Add Participants")
        print("2️⃣ Upload a CSV File")
        print("0️⃣ Go Back")

        choice = input("\n👉 Enter your choice: ").strip()

        if choice == "1":
            manually_add_participants()
        elif choice == "2":
            upload_csv()
        elif choice == "0":
            print("👋 Returning to main menu...")
            break
        else:
            print("❌ Invalid choice! Try again.")

def manually_add_participants():
    """Manually adds participants one by one."""

    participants = load_participants()
    existing_ids = {p["ID"] for p in participants}

    while True:
        print("\n📌 Add a New Participant:")
        participant_id = input("👉 Enter ID (or type 'exit' to stop): ").strip()
        if participant_id.lower() == "exit":
            break

        if participant_id in existing_ids:
            print("❌ This ID already exists! Try a different one.")
            continue

        name = input("👉 Enter Name: ").strip()

        new_participant = {
            "ID": participant_id,
            "Name": name,
            "QR_Code": "",
            "Snack_Received": "No"
        }

        participants.append(new_participant)
        existing_ids.add(participant_id)

        print(f"✅ Added Participant: {participant_id} - {name}")

    save_participants(participants)
    print("📂 All new participants have been saved!")

def upload_csv():
    """Allows the user to upload a CSV file containing participants."""
    
    file_path = input("\n📂 Enter the full path to your CSV file: ").strip()

    # 🔥 Automatically fix file paths for Windows & Linux
    file_path = os.path.abspath(file_path)

    if not os.path.exists(file_path):
        print(f"❌ Error: File not found! Check the path: {file_path}")
        return

    try:
        with open(file_path, "r", newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            participants = list(reader)

            # Validate CSV headers
            required_fields = {"ID", "Name", "QR_Code", "Snack_Received"}
            if not required_fields.issubset(reader.fieldnames):
                print("❌ Error: CSV must contain headers: ID, Name, QR_Code, Snack_Received")
                return

            # Load existing IDs to prevent duplicates
            existing_participants = load_participants()
            existing_ids = {p["ID"] for p in existing_participants}

            new_participants = []
            for p in participants:
                if p["ID"] not in existing_ids:
                    new_participants.append({
                        "ID": p["ID"].strip(),
                        "Name": p["Name"].strip(),
                        "QR_Code": p.get("QR_Code", "").strip(),  # Keep empty if missing
                        "Snack_Received": p.get("Snack_Received", "No").strip()  # Default to No
                    })
                    existing_ids.add(p["ID"])  # Prevent duplicate additions

            # Save the merged list
            save_participants(existing_participants + new_participants)
            print(f"✅ Uploaded and saved {len(new_participants)} new participants from '{file_path}'")

    except Exception as e:
        print(f"❌ Error reading file: {e}")

if __name__ == "__main__":
    add_participant()
