import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const quizService = {
  getQuizList: async () => {
    return await api.get(API_ENDPOINTS.QUIZ_LIST);
  },

  getQuizDetail: async (quizId) => {
    const url = API_ENDPOINTS.QUIZ_DETAIL.replace(':id', quizId);
    return await api.get(url);
  },

  submitQuiz: async (quizData) => {
    return await api.post(API_ENDPOINTS.QUIZ_SUBMIT, quizData);
  },
};
