import axios from "axios";
// const BASE_URL = "http://192.168.10.107:3004"; 
const BASE_URL = "https://dotecom.24livehost.com/ecommerce"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerDevice = (data) => api.post('/devices', data);

// Notification Sending
export const sendNotification = async(data) => await api.post('/message/send-to-device', data);

// Get User Devices (optional)
export const getUserDevices = (userId) => api.get(`/devices/${userId}`);

// Function to handle GET requests
export const getDataEmail = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

// Function to handle POST requests
export const postDataEmail = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
};
