import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const rankingService = {
  getRankings: async (params = { order_by: 'point', order: 'desc' }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${API_ENDPOINTS.GET_RANKINGS}?${queryString}`;
      console.log('Requesting rankings:', url);
      console.log('Token:', localStorage.getItem('token')); // 토큰 확인
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get rankings error:', error.response || error);
      throw error;
    }
  }
};
