import axios from "axios";
// const BASE_URL = "http://192.168.10.107:3001";
 const BASE_URL = "https://dotecom.24livehost.com/product"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle GET requests
export const getprodData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

export const filterProducts = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
};

// Function to handle POST requests
export const postprodData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    console.error("API POST Error:", error);
    throw error;
  }
};

// Function to handle PUT requests
export const putprodData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response;
  } catch (error) {
    console.error("API PUT Error:", error);
    throw error;
  }
};

// Function to handle DELETE requests
export const deleteprodData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};

export const searchProduct = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};

export const getAllCategories = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error("API DELETE Error:", error);
    throw error;
  }
};


export default api;
