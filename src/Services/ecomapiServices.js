import axios from "axios";
const BASE_URL = "https://dotecom.24livehost.com/ecommerce"; // Change this to your API base URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle GET requests
export const getecomData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

// Function to handle POST requests
export const postecomData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
};

// Function to handle PUT requests
export const putecomData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("API PUT Error:", error);
    throw error;
  }
};

// Function to handle DELETE requests
export const deleteecomData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};

export default api;
