from qr_snack import generate_qr, scan_qr, delete_qr_images, reset_snack_status, reset_all, add_participant

def main():
    while True:
        print("\n📌 Choose an option:")
        print("1️⃣ Add New Participants (Manual or CSV Upload)")
        print("2️⃣ Generate QR Codes")
        print("3️⃣ Scan QR Codes")
        print("4️⃣ Delete All QR Images")
        print("5️⃣ Reset Snack Status")
        print("6️⃣ Full Reset (Delete QR Images + Clear CSV)")
        print("0️⃣ Exit")

        choice = input("\n👉 Enter your choice: ")

        if choice == "1":
            add_participant()
        elif choice == "2":
            generate_qr()
        elif choice == "3":
            scan_qr()
        elif choice == "4":
            delete_qr_images()
        elif choice == "5":
            reset_snack_status()
        elif choice == "6":
            reset_all()
        elif choice == "0":
            print("👋 Exiting...")
            break
        else:
            print("❌ Invalid choice! Try again.")

if __name__ == "__main__":
    main()
