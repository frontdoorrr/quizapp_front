import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const rankingService = {
  // 기존 함수는 하위 호환성을 위해 유지
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
  },
  
  // 전체 랭킹을 가져오는 함수
  getTotalRankings: async (params = { order_by: 'point', order: 'desc', }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${API_ENDPOINTS.GET_TOTAL_RANKINGS}?${queryString}`;
      console.log('Requesting total rankings:', url);
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get total rankings error:', error.response || error);
      throw error;
    }
  },
  
  // 현재 게임 정보 가져오기
  getCurrentGame: async () => {
    try {
      const url = API_ENDPOINTS.GAME_URL;
      console.log('Requesting current game:', url);
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get current game error:', error.response || error);
      throw error;
    }
  },
  
  // 게임별 랭킹을 가져오는 함수 (game_id 필요)
  getGameRankings: async (gameId) => {
    try {
      if (!gameId) {
        throw new Error('게임 ID가 필요합니다.');
      }
      
      const url = `${API_ENDPOINTS.GET_GAME_RANKING}/${gameId}/ranking`;
      console.log('Requesting game rankings:', url);
      
      const response = await api.get(url);
      console.log('Raw game rankings response:', response);
      
      // 응답 데이터 형식 확인 및 로깅
      const responseData = response.data;
      console.log('Game rankings response data type:', typeof responseData);
      console.log('Is response data an array?', Array.isArray(responseData));
      
      if (responseData && Array.isArray(responseData)) {
        // 각 항목에 user 객체가 있는지 확인
        responseData.forEach((item, index) => {
          console.log(`Item ${index}:`, item);
          if (item.user) {
            console.log(`Item ${index} user:`, item.user);
            console.log(`Item ${index} nickname:`, item.user.nickname);
          } else {
            console.log(`Item ${index} has no user object`);
          }
        });
      }
      
      return responseData;
    } catch (error) {
      console.error('Get game rankings error:', error.response || error);
      throw error;
    }
  }
};
