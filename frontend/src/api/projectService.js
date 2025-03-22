import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};