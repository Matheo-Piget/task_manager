import { apiClient } from './api-client';
import logger from '../utils/logger';

/**
 * Récupère les tendances de complétion des tâches sur une période donnée
 * @param {string} timeRange - Période ('week', 'month', 'quarter', 'year')
 * @returns {Promise<Array>} Données de tendance
 */
export const getCompletionTrends = async (timeRange) => {
  try {
    logger.debug(`Fetching completion trends for ${timeRange}`);
    const response = await apiClient.get(`/analytics/completion-trends?period=${timeRange}`);
    return response.data;
  } catch (error) {
    logger.error('Error fetching completion trends:', error);
    throw error;
  }
};

/**
 * Récupère les métriques de productivité
 * @returns {Promise<Object>} Métriques de productivité
 */
export const getProductivityMetrics = async () => {
  try {
    logger.debug('Fetching productivity metrics');
    const response = await apiClient.get('/analytics/productivity');
    return response.data;
  } catch (error) {
    logger.error('Error fetching productivity metrics:', error);
    throw error;
  }
};

/**
 * Récupère la distribution des tâches selon le type spécifié
 * @param {string} type - Type de distribution ('status', 'priority', 'project')
 * @returns {Promise<Object>} Distribution des tâches
 */
export const getTaskDistribution = async (type) => {
  try {
    logger.debug(`Fetching task distribution by ${type}`);
    const response = await apiClient.get(`/analytics/distribution?type=${type}`);
    return response.data;
  } catch (error) {
    logger.error('Error fetching task distribution:', error);
    throw error;
  }
};

/**
 * Récupère le taux de complétion par tags
 * @returns {Promise<Array>} Taux de complétion par tag
 */
export const getCompletionRateByTags = async () => {
  try {
    logger.debug('Fetching tag completion rates');
    const response = await apiClient.get('/analytics/tags/completion');
    return response.data;
  } catch (error) {
    logger.error('Error fetching tag completion rates:', error);
    throw error;
  }
};