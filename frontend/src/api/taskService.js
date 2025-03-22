import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTasks = async (filters = {}) => {
  try {
    const response = await api.get('/tasks');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const getTaskStatistics = async () => {
  // Pour le développement, retourne des données fictives
  return {
    totalTasks: 18,
    completedTasks: 8,
    overdueTasks: 3,
    upcomingTasks: 7,
    statusDistribution: {
      TODO: 5,
      IN_PROGRESS: 3,
      DONE: 8,
      ARCHIVED: 2
    },
    priorityDistribution: {
      LOW: 4,
      MEDIUM: 7,
      HIGH: 5,
      URGENT: 2
    }
  };
};