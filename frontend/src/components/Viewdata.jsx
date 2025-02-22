import React from "react";

function ViewData({ participants }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Participant Data</h2>
      {participants.length === 0 ? (
        <p className="text-gray-500">No participants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 border-b text-left">ID</th>
                <th className="py-3 px-6 border-b text-left">Name</th>
                <th className="py-3 px-6 border-b text-left">Snack Status</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.ID} className="hover:bg-gray-100 transition duration-300">
                  <td className="py-3 px-6 border-b">{participant.ID}</td>
                  <td className="py-3 px-6 border-b">{participant.Name}</td>
                  <td className="py-3 px-6 border-b">{participant.Snack_Received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewData;