import { apiClient } from './api-client';

export const getTags = async () => {
  try {
    const response = await apiClient.get('/tags');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

export const getTagById = async (id) => {
  try {
    const response = await apiClient.get(`/tags/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tag ${id}:`, error);
    throw error;
  }
};

export const createTag = async (tagData) => {
  try {
    const response = await apiClient.post('/tags', tagData);
    return response.data;
  } catch (error) {
    console.error('Error creating tag:', error);
    throw error;
  }
};

export const updateTag = async (id, tagData) => {
  try {
    const response = await apiClient.put(`/tags/${id}`, tagData);
    return response.data;
  } catch (error) {
    console.error(`Error updating tag ${id}:`, error);
    throw error;
  }
};

export const deleteTag = async (id) => {
  try {
    await apiClient.delete(`/tags/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting tag ${id}:`, error);
    throw error;
  }
};