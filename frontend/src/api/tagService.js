import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTags = async () => {
  try {
    const response = await api.get('/tags');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};