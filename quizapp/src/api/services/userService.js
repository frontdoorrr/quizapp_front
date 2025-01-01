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
      console.log('Updating profile with data:', userData);
      const response = await api.patch(API_ENDPOINTS.UPDATE_PROFILE, {
        nickname: userData.nickname
      });
      console.log('Update profile response:', response);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      throw error;
    }
  },
};
