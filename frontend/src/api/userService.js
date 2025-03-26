import apiClient from './authService';

export const getUsers = async () => {
  try {
    // Pour le développement, nous retournons un utilisateur statique
    // Dans un environnement de production, vous appelleriez une API
    return [
      { id: 1, name: 'Admin User', username: 'admin' }
    ];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};