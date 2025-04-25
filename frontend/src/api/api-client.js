import axios from 'axios';

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
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour les requêtes authentifiées
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        console.log('Authentication expired or invalid. Redirecting to login...');
        
        // Ne pas rediriger si déjà sur /login ou /register
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location = '/login';
        }
      } else if (status === 403) {
        console.error('Access denied to this resource');
      } else if (status >= 500) {
        console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);