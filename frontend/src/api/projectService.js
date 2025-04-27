import { apiClient } from './api-client';
import logger from '../utils/logger';

export const getProjects = async () => {
  try {
    logger.debug('Fetching all projects');
    const response = await apiClient.get('/projects');
    return response.data || [];
  } catch (error) {
    logger.error('Error fetching projects:', error);
    // Propagez l'erreur pour une meilleure gestion au niveau du composant
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    logger.debug(`Fetching project with id ${id}`);
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching project ${id}:`, error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    logger.debug('Creating new project', projectData);
    const response = await apiClient.post('/projects', projectData);
    return response.data;
  } catch (error) {
    logger.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    logger.debug(`Updating project ${id}`, projectData);
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    logger.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    logger.debug(`Deleting project ${id}`);
    await apiClient.delete(`/projects/${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting project ${id}:`, error);
    throw error;
  }
};

export const getProjectTasks = async (projectId) => {
  try {
    logger.debug(`Fetching tasks for project ${projectId}`);
    const response = await apiClient.get(`/projects/${projectId}/tasks`);
    return response.data || [];
  } catch (error) {
    logger.error(`Error fetching tasks for project ${projectId}:`, error);
    return [];
  }
};