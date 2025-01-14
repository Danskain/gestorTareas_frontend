import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Cambia por tu URL base

// Servicio para login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ login ~ error:", error)
    return error.response.data.error
    //throw new Error(error.response?.data?.message || 'Error en el login');
  }
};

// Servicio para registro
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};