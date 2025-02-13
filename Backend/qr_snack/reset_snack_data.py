from qr_snack.database import load_participants, save_participants

def reset_snack_status():
    """Resets all participants' snack status to 'No'."""
    participants = load_participants()
    
    for participant in participants:
        participant["Snack_Received"] = "No"
    
    save_participants(participants)
    print("✅ All snack statuses reset to 'No'.")

if __name__ == "__main__":
    reset_snack_status()
