import React from "react";

function Sidebar({ setActiveSection, activeSection }) {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 transition-all duration-300">
      <div className="flex flex-col items-start mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>
      <div className="space-y-4">
        <button
          onClick={() => setActiveSection("totalStudents")}
          className={`w-48 py-2 px-4 text-left hover:bg-gray-700 rounded ${
            activeSection === "totalStudents" ? "bg-gray-700" : ""
          }`}
        >
          Total Students
        </button>
        <button
          onClick={() => setActiveSection("viewData")}
          className={`w-48 py-2 px-4 text-left hover:bg-gray-700 rounded ${
            activeSection === "viewData" ? "bg-gray-700" : ""
          }`}
        >
          View Data
        </button>
        <button
          onClick={() => setActiveSection("addData")}
          className={`w-48 py-2 px-4 text-left hover:bg-gray-700 rounded ${
            activeSection === "addData" ? "bg-gray-700" : ""
          }`}
        >
          Add Data
        </button>
        <button
          onClick={() => setActiveSection("generateQR")}
          className={`w-48 py-2 px-4 text-left hover:bg-gray-700 rounded ${
            activeSection === "generateQR" ? "bg-gray-700" : ""
          }`}
        >
          Generate QR
        </button>
        <button
          onClick={() => setActiveSection("viewQRCodes")}
          className={`w-48 py-2 px-4 text-left hover:bg-gray-700 rounded ${
            activeSection === "viewQRCodes" ? "bg-gray-700" : ""
          }`}
        >
          View QR Codes
        </button>
        <button
          onClick={() => setActiveSection("resetOptions")}
          className={`w-48 py-2 px-4 text-left hover:bg-gray-700 rounded ${
            activeSection === "resetOptions" ? "bg-gray-700" : ""
          }`}
        >
          Reset Options
        </button>
      </div>
    </div>
  );
}

export default Sidebar;