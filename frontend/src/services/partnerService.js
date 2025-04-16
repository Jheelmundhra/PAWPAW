import axios from "axios";

const API_URL ="http://localhost:5004/api";

// Submit partner application
export const submitPartnerApplication = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/partners`, formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting partner application:", error);
    throw error;
  }
};

// Get all partners (admin function)
export const getAllPartners = async () => {
  try {
    const response = await axios.get(`${API_URL}/partners`);
    return response.data;
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
};

// Update partner status (admin function)
export const updatePartnerStatus = async (partnerId, status) => {
  try {
    const response = await axios.patch(`${API_URL}/partners/${partnerId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating partner status:", error);
    throw error;
  }
};
