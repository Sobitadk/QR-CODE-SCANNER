import React, { useState } from "react";
import { addParticipant, uploadCSV } from "../api";

const AddParticipantForm = ({ refreshParticipants }) => {
  const [participant, setParticipant] = useState({
    ID: "",
    Name: "",
    QR_Code: "",
    Snack_Received: "No",
  });
  const [csvFile, setCsvFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParticipant({ ...participant, [name]: value });
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSubmitManual = async (e) => {
    e.preventDefault();
    try {
      const response = await addParticipant(participant);
      alert(response.message);
      setParticipant({ ID: "", Name: "", QR_Code: "", Snack_Received: "No" });
      refreshParticipants();
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleSubmitCSV = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }
    try {
      const response = await uploadCSV(csvFile);
      alert(response.message);
      setCsvFile(null);
      document.querySelector('input[type="file"]').value = ""; // Clear file input
      refreshParticipants();
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Manage Participants</h2>

      {/* Manual Entry Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Add Participant Manually</h3>
        <form onSubmit={handleSubmitManual} className="space-y-4">
          <input
            type="text"
            name="ID"
            value={participant.ID}
            onChange={handleInputChange}
            placeholder="Participant ID"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="Name"
            value={participant.Name}
            onChange={handleInputChange}
            placeholder="Participant Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-48 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block"
          >
            Add Participant
          </button>
        </form>
      </div>

      <hr className="my-6" />

      {/* CSV Upload Form */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload CSV</h3>
        <form onSubmit={handleSubmitCSV} className="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-48 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mx-auto block"
          >
            Upload CSV
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddParticipantForm;