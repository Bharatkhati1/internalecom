import axios from "axios";
const BASE_URL = "http://localhost:3007"; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle GET requests
export const getloginData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

// Function to handle POST requests
export const postloginData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
};

export const putUpdateAddressData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
};


// Function to handle PUT requests
export const putloginData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response;
  } catch (error) {
    console.error("API PUT Error:", error);
    throw error;
  }
};

// Function to handle DELETE requests
export const deleteloginData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};

export const forgotPassword = async (endpoint, data) =>{
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};

export const deleteUserAddress = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

export const setDefaultAddress = async(endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

export default api;
