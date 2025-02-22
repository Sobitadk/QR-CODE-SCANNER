import React, { useState } from "react";
import { generateQr, generateAllQr } from "../api";

function GenerateQR({ refreshParticipants }) {
  const [participantId, setParticipantId] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [qrCodes, setQrCodes] = useState({});
  const [message, setMessage] = useState("");

  const handleGenerateSingle = async () => {
    if (!participantId) {
      setMessage("Please enter a participant ID.");
      return;
    }
    try {
      const response = await generateQr(participantId);
      setQrCodeUrl(response.qr_code_url);
      setQrCodes({});
      setMessage(response.message);
      refreshParticipants(); // Refresh to update QR codes in View QR Codes section
    } catch (error) {
      setMessage(`Error: ${error}`);
      setQrCodeUrl(null);
    }
  };

  const handleGenerateAll = async () => {
    try {
      const response = await generateAllQr();
      setQrCodes(response.qr_codes);
      setQrCodeUrl(null);
      setMessage(response.message);
      refreshParticipants(); // Refresh to update QR codes in View QR Codes section
    } catch (error) {
      setMessage(`Error: ${error}`);
      setQrCodes({});
    }
  };

  const handleDownload = (id, url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR_${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Generate QR Codes</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Generate Single QR</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            placeholder="Participant ID (e.g., P001)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleGenerateSingle}
            className="w-48 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
          >
            Generate QR Code
          </button>
        </div>
        {qrCodeUrl && (
          <div className="mt-4 flex flex-col items-center">
            <img src={qrCodeUrl} alt={`QR Code for ${participantId}`} className="max-w-xs" />
            <button
              onClick={() => handleDownload(participantId, qrCodeUrl)}
              className="mt-2 w-48 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Download QR
            </button>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Generate All QR Codes</h3>
        <button
          onClick={handleGenerateAll}
          className="w-48 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
        >
          Generate All QR Codes
        </button>
        {Object.keys(qrCodes).length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(qrCodes).map(([id, url]) => (
              <div key={id} className="flex flex-col items-center">
                <p className="text-gray-700 mb-2">{id}</p>
                <img src={url} alt={`QR Code for ${id}`} className="max-w-xs" />
                <button
                  onClick={() => handleDownload(id, url)}
                  className="mt-2 w-48 py-1 px-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {message && (
        <p className={`mt-4 text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default GenerateQR;