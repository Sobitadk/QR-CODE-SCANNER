# 🎯 Snack Management System

A comprehensive Python solution that seamlessly integrates QR code generation, scanning, and snack management. This system enables you to add participants (manually or via CSV), generate unique QR codes, and automatically manage snack distribution by updating each participant’s snack status upon scanning.

---

## 🚀 Features

- **Add Participants**  
  - Manually enter participant details.  
  - Upload a CSV file with participant data.

- **Generate QR Codes**  
  - Automatically generate unique QR codes for each participant.  
  - Save QR images inside the `qr_img/` folder.

- **Scan QR Codes & Manage Snacks**  
  - Use a webcam to scan QR codes.  
  - Automatically check if a participant has already received a snack.  
  - If not, update the `Snack_Received` status to "Yes" in `participants.csv` to prevent duplicate redemption.

- **Full Reset**  
  - Delete all QR images.  
  - Clear all participant data.

- **Prevents Errors**  
  - Ensures no duplicate participants.  
  - Warns if scanning is attempted without generating QR codes.  
  - Validates CSV structure before uploading.

---

## 📌 Setup & Installation

### 1️⃣ Prerequisites

Ensure you have **Python 3.8+** installed. It is recommended to use a virtual environment to avoid dependency conflicts:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 2️⃣ Install Dependencies

You can install all required dependencies using the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

Or install them manually:

```bash
pip install \
    opencv-python==4.8.0.76 \
    numpy==1.26.2 \
    pyzbar==0.1.9 \
    qrcode[pil]==7.4.2 \
    pypng==0.20220715.0
```

### 3️⃣ Run the Main Script

```bash
python main.py
```

---

## 📌 Download Package

The `download-package` directory contains additional resources to enhance the functionality of the system. It includes:

- Prebuilt QR codes for testing.
- Example CSV files for easy setup.
- Additional dependencies or scripts.

### 📥 How to Use
1. Ensure the `download-package` directory is placed in the root folder of the project.
2. Use the provided example CSV files to format your own participant data correctly.
3. If any additional dependencies are required, install them using the provided instructions in the package.

---

## 📌 Usage Guide

### 📂 Add Participants (Manual or CSV Upload)

1. Run:
   ```bash
   python main.py
   ```
2. Select **`1️⃣ Add New Participants`**
3. Choose:
   - **`1️⃣`** Manually enter participant details.
   - **`2️⃣`** Upload a CSV file.

---

## 📌 Input Format for Manual Entry in `main.py`

When adding participants manually via `main.py`, enter the data in the following format:

| Input Prompt   | Example          |
| -------------- | ---------------- |
| **Enter ID**   | `P101`           |
| **Enter Name** | `Michael Jordan` |

✔ The system **automatically sets** `QR_Code` to `""` and `Snack_Received` to `"No"`.

---

## 📌 CSV Format Example for Upload

Your CSV file should be structured like this:

```csv
ID,Name,QR_Code,Snack_Received
P101,Michael Jordan,,
P102,Serena Williams,,
P103,Cristiano Ronaldo,,
```

✔ **Only `ID` and `Name` are required.**  
✔ **`QR_Code` & `Snack_Received` should be empty (`""`) for new entries.**

---

## 📂 Folder Structure

```
QR-CODE-SCANNER/
│── Backend/
│   │── main.py  # Run this script
│   │── qr_snack/
│   │   │── __init__.py
│   │   │── database.py
│   │   │── generator.py
│   │   │── scanner.py
│   │   │── delete_qr.py
│   │   │── reset_snack.py
│   │   │── reset_all.py
│   │   │── add_participants.py
│   │── database-csv/
│   │   │── participants.csv  # Stores participant data
│   │── qr_img/  # Stores generated QR codes
│── download-package/  # Additional resources and examples
│── venv/  # Virtual environment (ignored by Git)
│── README.md
│── .gitignore
│── requirements.txt  # Dependency file
```

---

## ❗ Common Issues & Fixes

### ❌ File Not Found When Uploading CSV

- Ensure the file path is **correct and does not contain quotes (`"..."`)**.
- Example of correct input:
  ```
  📂 Enter the full path to your CSV file: C:\Users\sujat\OneDrive\Desktop\QR\participants.csv
  ```

### ❌ QR Codes Not Generating

- Ensure **participants exist** before running the QR generator.
- Run `python main.py` → **`1️⃣ Add Participants`** before selecting **`2️⃣ Generate QR Codes`**.

---

## 🤝 Contributing

1. **Fork the repo**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/QR-CODE-SCANNER.git
   ```
3. **Create a new branch**
   ```bash
   git checkout -b feature-branch
   ```
4. **Commit your changes**
   ```bash
   git commit -m "Add new feature"
   ```
5. **Push to GitHub**
   ```bash
   git push origin feature-branch
   ```
6. **Create a Pull Request** 🚀

---

## 📜 License

🌟 This project is open-source and available under the **MIT License**.

---

