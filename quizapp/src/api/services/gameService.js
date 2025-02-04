import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const getCurrentGame = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GAME_URL);
    return response.data;
  } catch (error) {
    console.error('Error getting current game:', error);
    throw error;
  }
};
