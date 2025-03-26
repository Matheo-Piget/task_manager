import apiClient from './authService'; // Import the configured axios instance

export const getTasks = async (filters = {}) => {
  try {
    const response = await apiClient.get('/tasks', { params: filters });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
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

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await apiClient.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await apiClient.delete(`/tasks/${taskId}`);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const getTaskStatistics = async () => {
  try {
    const response = await apiClient.get('/tasks/statistics');
    return response.data;
  } catch (error) {
    console.error('Error fetching task statistics:', error);
    // Return some default data as a fallback
    return {
      totalTasks: 0,
      completedTasks: 0,
      overdueTasks: 0,
      upcomingTasks: 0,
      statusDistribution: {
        TODO: 0,
        IN_PROGRESS: 0,
        DONE: 0,
        ARCHIVED: 0
      },
      priorityDistribution: {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        URGENT: 0
      }
    };
  }
};