// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getUser } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUser();
          setCurrentUser(userData);
        } catch (err) {
          localStorage.removeItem('token');
          setError(err.message);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await registerUser(userData);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// api/taskService.js
import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

const API_URL = 'http://localhost:8080/api';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authorization header to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async (filters = {}) => {
  try {
    let url = '/tasks';
    if (Object.keys(filters).length > 0) {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      url += `?${queryParams.toString()}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    return true;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getTaskStatistics = async () => {
  try {
    const response = await api.get('/tasks/statistics');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};