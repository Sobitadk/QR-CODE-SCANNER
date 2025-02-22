import React, { useState } from "react";

function ResetOptions({ refreshParticipants }) {
  const backendURL = "http://localhost:8000";
  const [message, setMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState("");

  const resetSnackStatus = async () => {
    if (confirmAction !== "resetSnack") {
      setConfirmAction("resetSnack");
      setMessage("Click again to confirm resetting snack status.");
      return;
    }
    try {
      const res = await fetch(`${backendURL}/reset-snack-data`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to reset");
      setMessage(data.message);
      setConfirmAction("");
      refreshParticipants();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const deleteQR = async () => {
    if (confirmAction !== "deleteQR") {
      setConfirmAction("deleteQR");
      setMessage("Click again to confirm deleting all QR codes.");
      return;
    }
    try {
      const res = await fetch(`${backendURL}/delete-qr`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to delete");
      setMessage(data.message);
      setConfirmAction("");
      refreshParticipants();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const resetAllData = async () => {
    if (confirmAction !== "resetAll") {
      setConfirmAction("resetAll");
      setMessage("Click again to confirm resetting all data.");
      return;
    }
    try {
      const res = await fetch(`${backendURL}/delete-all`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to reset");
      setMessage(data.message);
      setConfirmAction("");
      refreshParticipants();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Reset Options</h2>

      <div className="flex flex-wrap gap-6 justify-start">
        <button
          onClick={resetSnackStatus}
          className="bg-blue-600 text-white px-8 py-4 rounded hover:bg-blue-700 transition duration-200 w-56"
        >
          Reset Snack Status
        </button>
        <button
          onClick={deleteQR}
          className="bg-blue-600 text-white px-8 py-4 rounded hover:bg-blue-700 transition duration-200 w-56"
        >
          Delete All QR Codes
        </button>
        <button
          onClick={resetAllData}
          className="bg-blue-600 text-white px-8 py-4 rounded hover:bg-blue-700 transition duration-200 w-56"
        >
          Reset All Data
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ResetOptions;