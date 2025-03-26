import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to add token to all requests
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., expired token)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;