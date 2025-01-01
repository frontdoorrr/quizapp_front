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
      // PUT 대신 PATCH 메서드 사용 (부분 업데이트)
      const response = await api.patch(API_ENDPOINTS.UPDATE_PROFILE, userData);
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
