import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const rankingService = {
  getRankingList: async () => {
    return await api.get(API_ENDPOINTS.RANKING_LIST);
  },

  getUserRanking: async (userId) => {
    const url = API_ENDPOINTS.USER_RANKING.replace(':id', userId);
    return await api.get(url);
  },
};
