import { publicApiClient, apiClient } from './api-client';

export const loginUser = async (credentials) => {
  try {
    // Utiliser l'API publique pour la connexion
    const response = await publicApiClient.post('/auth/login', credentials);
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    // Utiliser l'API publique pour l'inscription
    const response = await publicApiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    // Utiliser l'API authentifiée pour récupérer les infos utilisateur
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await apiClient.post('/auth/verify');
    return response.data.valid;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};