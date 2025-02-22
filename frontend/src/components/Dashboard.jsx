import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import AddParticipantForm from "./AddParticipantForm";
import ViewData from "./ViewData";
import ResetOptions from "./ResetOptions";
import GenerateQR from "./GenerateQR";

function Dashboard() {
  const backendURL = "http://localhost:8000";
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("totalStudents");
  const [qrCodes, setQrCodes] = useState({}); // Store QR codes as ID: Base64 URL

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      console.log("Attempting to fetch from:", `${backendURL}/participants`);
      const res = await fetch(`${backendURL}/participants`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
      console.log("Response status:", res.status);
      console.log("Response headers:", [...res.headers.entries()]);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }
      const data = await res.json();
      console.log("Response data:", data);
      setParticipants(data);
      setMessage("");
      // Fetch QR codes for participants with existing QR_Code paths
      const qrMap = {};
      const fetchPromises = data
        .filter((p) => p.QR_Code)
        .map((p) =>
          fetch(`${backendURL}/generate_qr`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ participant_id: p.ID }),
          })
            .then((res) => res.json())
            .then((qrData) => {
              qrMap[p.ID] = qrData.qr_code_url;
            })
        );
      await Promise.all(fetchPromises);
      setQrCodes(qrMap);
    } catch (error) {
      console.error("Fetch error:", error.name, error.message, error.stack);
      setMessage(`Error loading participants: ${error.message}`);
    }
  };

  const refreshParticipants = () => fetchParticipants();

  const downloadAllQRs = () => {
    Object.entries(qrCodes).forEach(([id, url]) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `QR_${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const downloadSingleQR = (id, url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR_${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-8">
        {message && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-md">
            <p>{message}</p>
          </div>
        )}
        {activeSection === "totalStudents" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Total Students</h2>
            <p>{participants.length}</p>
          </div>
        )}
        {activeSection === "viewData" && <ViewData participants={participants} />}
        {activeSection === "addData" && (
          <AddParticipantForm refreshParticipants={refreshParticipants} />
        )}
        {activeSection === "generateQR" && <GenerateQR refreshParticipants={refreshParticipants} />}
        {activeSection === "viewQRCodes" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">View All QR Codes</h2>
            {Object.keys(qrCodes).length > 0 ? (
              <div>
                <button
                  onClick={downloadAllQRs}
                  className="mb-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Download All QR Codes
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(qrCodes).map(([id, url]) => (
                    <div key={id} className="flex flex-col items-center">
                      <p className="text-gray-700 mb-2">{id}</p>
                      <img src={url} alt={`QR Code for ${id}`} className="max-w-xs" />
                      <button
                        onClick={() => downloadSingleQR(id, url)}
                        className="mt-2 py-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No QR codes generated yet. Use 'Generate QR' to create some.</p>
            )}
          </div>
        )}
        {activeSection === "resetOptions" && (
          <ResetOptions refreshParticipants={refreshParticipants} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;