import apiClient from './authService'; // Import the configured axios instance

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};