export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',

  // User
  USER_PROFILE: '/user/profile',
  USER_UPDATE: '/user/update',

  // Quiz
  QUIZ_LIST: '/quiz/list',
  QUIZ_DETAIL: '/quiz/:id',
  QUIZ_SUBMIT: '/quiz/submit',

  // Ranking
  RANKING_LIST: '/ranking/list',
  USER_RANKING: '/ranking/user/:id',
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
