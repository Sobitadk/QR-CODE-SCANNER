
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const addParticipant = async (participant) => {
  try {
    const response = await axios.post(`${API_URL}/participants`, participant);
    return response.data;
  } catch (error) {
    console.error("Add Participant Error:", error.response?.data || error.message);
    throw error.response?.data?.detail || "Failed to add participant";
  }
};

export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(`${API_URL}/upload-csv`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Upload CSV Error:", error.response?.data || error.message);
    throw error.response?.data?.detail || "Failed to upload CSV";
  }
};

export const getParticipants = async () => {
  try {
    const response = await axios.get(`${API_URL}/participants`);
    return response.data;
  } catch (error) {
    console.error("Get Participants Error:", error.response?.data || error.message);
    throw error.response?.data?.detail || "Failed to fetch participants";
  }
};

export const getParticipantsBySnackStatus = async (status) => {
  try {
    const response = await axios.get(`${API_URL}/participants/snack-status`, {
      params: { snack_received: status },
    });
    return response.data;
  } catch (error) {
    console.error("Filter Participants Error:", error.response?.data || error.message);
    throw error.response?.data?.detail || "Failed to filter participants";
  }
};

export const generateQr = async (participantId) => {
  try {
    const response = await axios.post(`${API_URL}/generate_qr`, { participant_id: participantId });
    return response.data;
  } catch (error) {
    console.error("Generate QR Error:", error.response?.data || error.message);
    throw error.response?.data?.detail || "Failed to generate QR code";
  }
};

export const generateAllQr = async () => {
  try {
    const response = await axios.post(`${API_URL}/generate_all_qr`);
    return response.data;
  } catch (error) {
    console.error("Generate All QR Error:", error.response?.data || error.message);
    throw error.response?.data?.detail || "Failed to generate all QR codes";
  }
};

export const scanQr = async (data) => {
  try {
    console.log("Sending QR Data to Backend:", data);
    const response = await axios.post(`${API_URL}/scan_qr`, { qr_data: data });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Scan QR Error:", error.response?.data || error.message);
    throw error.response?.data?.detail || error.message || "Failed to scan QR code";
  }
};