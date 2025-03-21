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

export const getCompletionTrends = async (timeRange = 'week') => {
  try {
    const response = await api.get(`/analytics/completion-trends?timeRange=${timeRange}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProductivityMetrics = async () => {
  try {
    const response = await api.get('/analytics/productivity');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getTaskDistribution = async (groupBy = 'status') => {
  try {
    const response = await api.get(`/analytics/distribution?groupBy=${groupBy}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getCompletionRateByTags = async () => {
  try {
    const response = await api.get('/analytics/tags-completion');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};