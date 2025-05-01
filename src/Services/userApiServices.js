import axios from "axios";
const BASE_URL = "https://dotecom.24livehost.com"; // Change this to your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle GET requests
export const updateUserDetails = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

export const deleteAddress = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

export default api;