import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const userService = {
  getProfile: async () => {
    return await api.get(API_ENDPOINTS.USER_PROFILE);
  },

  updateProfile: async (userData) => {
    return await api.put(API_ENDPOINTS.USER_UPDATE, userData);
  },
};
