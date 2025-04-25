import { apiClient } from './api-client';

export const getTasks = async () => {
  try {
    const response = await apiClient.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await apiClient.delete(`/tasks/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};

export const getTaskStatistics = async () => {
  try {
    const response = await apiClient.get('/tasks/statistics');
    return response.data;
  } catch (error) {
    console.error('Error fetching task statistics:', error);
    throw error;
  }
};