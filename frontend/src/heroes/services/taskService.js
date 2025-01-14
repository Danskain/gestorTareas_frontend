import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/last-status`); // Ajusta la URL a tu endpoint
    return response.data; // Asume que el servidor devuelve datos en este formato
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getHistoryTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/historyTask/${id}`); // Ajusta la URL a tu endpoint
    return response.data; // Asume que el servidor devuelve datos en este formato
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getSelectOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`); // Ajusta la URL a tu endpoint
    return response.data; // Asume que el servidor devuelve datos en este formato
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, payload) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/update-status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in updateTaskStatus:', error);
    throw error;
  }
  
};

export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/create-tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return await response.json();
};

