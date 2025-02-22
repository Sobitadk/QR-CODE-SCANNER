// src/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Backend server URL (change if deploying)

// Add a participant
export const addParticipant = async (participant) => {
  try {
    const response = await axios.post(`${API_URL}/participants`, participant);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to add participant";
  }
};

// Upload a CSV file
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(`${API_URL}/upload-csv`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to upload CSV";
  }
};

// Fetch all participants
export const getParticipants = async () => {
  try {
    const response = await axios.get(`${API_URL}/participants`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to fetch participants";
  }
};

// Filter participants by snack status
export const getParticipantsBySnackStatus = async (status) => {
  try {
    const response = await axios.get(`${API_URL}/participants/snack-status`, {
      params: { snack_received: status },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Failed to filter participants";
  }
};

// Generate QR code for a single participant
export const generateQr = async (participantId) => {
  try {
    const response = await axios.post(`${API_URL}/generate_qr`, { participant_id: participantId });
    return response.data; // { message, qr_code_url, filename }
  } catch (error) {
    throw error.response?.data?.detail || "Failed to generate QR code";
  }
};

// Generate QR codes for all participants
export const generateAllQr = async () => {
  try {
    const response = await axios.post(`${API_URL}/generate_all_qr`);
    return response.data; // { message, qr_codes }
  } catch (error) {
    throw error.response?.data?.detail || "Failed to generate all QR codes";
  }
};