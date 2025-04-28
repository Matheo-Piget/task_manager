import { apiClient } from './api-client';
import logger from '../utils/logger';

/**
 * Récupère les notifications d'un utilisateur
 * @param {number} page Page à récupérer
 * @param {number} size Nombre d'éléments par page
 * @returns {Promise<Object>} Page de notifications
 */
export const getNotifications = async (page = 0, size = 20) => {
  try {
    logger.debug(`Fetching notifications page=${page}, size=${size}`);
    const response = await apiClient.get(`/notifications?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    logger.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Récupère les notifications non lues
 * @returns {Promise<Array>} Liste des notifications non lues
 */
export const getUnreadNotifications = async () => {
  try {
    logger.debug('Fetching unread notifications');
    const response = await apiClient.get('/notifications/unread');
    return response.data;
  } catch (error) {
    logger.error('Error fetching unread notifications:', error);
    throw error;
  }
};

/**
 * Récupère le nombre de notifications non lues
 * @returns {Promise<number>} Nombre de notifications non lues
 */
export const getUnreadCount = async () => {
  try {
    logger.debug('Fetching unread notification count');
    const response = await apiClient.get('/notifications/count');
    return response.data;
  } catch (error) {
    logger.error('Error fetching unread notification count:', error);
    return 0;
  }
};

/**
 * Marque une notification comme lue
 * @param {number} id ID de la notification
 * @returns {Promise<void>}
 */
export const markAsRead = async (id) => {
  try {
    logger.debug(`Marking notification ${id} as read`);
    await apiClient.post(`/notifications/${id}/read`);
  } catch (error) {
    logger.error(`Error marking notification ${id} as read:`, error);
    throw error;
  }
};

/**
 * Marque toutes les notifications comme lues
 * @returns {Promise<void>}
 */
export const markAllAsRead = async () => {
  try {
    logger.debug('Marking all notifications as read');
    await apiClient.post('/notifications/read-all');
  } catch (error) {
    logger.error('Error marking all notifications as read:', error);
    throw error;
  }
};