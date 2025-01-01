import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_PROFILE);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put(API_ENDPOINTS.UPDATE_PROFILE, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
