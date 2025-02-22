// src/components/ScanQR.jsx
import React, { useState } from "react";

function ScanQR() {
  const [scannedData, setScannedData] = useState("");
  const backendURL = "http://localhost:8000";

  const scanQR = async () => {
    try {
      const res = await fetch(`${backendURL}/scan_qr`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setScannedData(data.scanned_data);
      } else {
        setScannedData("No QR code detected.");
      }
    } catch (error) {
      setScannedData("Error scanning QR code.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Scan QR Code</h2>
      <button onClick={scanQR} className="bg-green-600 text-white px-4 py-2 rounded">
        Scan QR Code
      </button>
      {scannedData && (
        <p className="mt-4">Scanned Data: {JSON.stringify(scannedData)}</p>
      )}
    </div>
  );
}

export default ScanQR;
