import axios from 'axios';
import logger from '../utils/logger';

const API_URL = 'http://localhost:8080/api';

// Instance pour les endpoints authentifiés
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Instance sans intercepteur pour les routes publiques
export const publicApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour les requêtes authentifiées
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Log la requête pour débogage
    logger.logApiRequest(config.url, config.method, config.data);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour les requêtes authentifiées
// Intercepteur de réponse pour les requêtes authentifiées
apiClient.interceptors.response.use(
  response => {
    // Log la réponse pour débogage
    logger.logApiResponse(response.config.url, response.data);
    return response;
  },
  error => {
    if (error.response) {
      const { status } = error.response;
      
      // Journaliser l'erreur sans rediriger
      console.error(`API Error ${status}:`, error.response.data);
      
      // Uniquement pour le debugging, on renvoie juste l'erreur pour l'analyser
      return Promise.reject(error);
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);