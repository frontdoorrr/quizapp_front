import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

/**
 * 현재 게임 정보를 가져옵니다.
 * @returns {Promise<{
 *   id: string,
 *   question_link: string,
 *   answer?: string,    // 사용자가 이미 답변한 경우에만 존재
 *   point?: number,     // 사용자가 이미 답변한 경우에만 존재
 *   created_at: string,
 *   updated_at: string
 * }>}
 */
export const getCurrentGame = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GAME_URL);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('NO_ACTIVE_GAME');
    }
    console.error('Error getting current game:', error);
    throw error;
  }
};

/**
 * 게임에 대한 사용자의 답변을 가져옵니다.
 * @param {string} gameId 게임 ID
 * @returns {Promise<{
 *   id: string,
 *   game_id: string,
 *   answer: string,
 *   point: number,
 *   created_at: string,
 *   updated_at: string
 * } | null>} 답변 정보 또는 null(답변이 없는 경우)
 */
export const getAnswerByGame = async (gameId) => {
  try {
    const response = await api.get(`answer/game/${gameId}/user`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // 답변이 없는 경우
    }
    throw error;
  }
};

export const submitAnswer = async (gameId, answer) => {
  try {
    const response = await api.post(API_ENDPOINTS.SUBMIT_ANSWER, {
      game_id: gameId,
      answer: answer
    });
    return response.data;
  } catch (error) {
    // 디버깅을 위한 상세 로그
    console.log('Error object:', {
      error,
      detail: error.detail,
      detailType: typeof error.detail
    });

    if (error.response?.status === 404) {
      throw new Error('게임을 찾을 수 없습니다.');
    }

    if (error.detail === "Insufficient coins to submit answer") {
      throw new Error('코인이 부족합니다.');
    }
    if (error.detail === "You have already submitted an answer for this game") {
      throw new Error("이번 게임을 위한 정답 기회가 남아있지 않습니다.")
    }

    throw new Error('오류가 발생했습니다. 다시 시도해주세요.');
  }
};
