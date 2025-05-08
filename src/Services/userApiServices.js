import axios from "axios";
const BASE_URL = "http://192.168.10.107:3007"; // Change this to your API base URL

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



export default api;