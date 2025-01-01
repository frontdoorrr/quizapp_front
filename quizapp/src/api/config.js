export const API_BASE_URL = 'http://localhost:8000';

// 기본 헤더 설정
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// 로그인 전용 헤더
export const LOGIN_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json',
};

// 인증 헤더 생성 함수
export const createAuthHeaders = (accessToken) => ({
  ...DEFAULT_HEADERS,
  'Authorization': `Bearer ${accessToken}`,
});

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  LOGOUT: '/auth/logout',

  // User
  GET_PROFILE: '/user/me',
  UPDATE_PROFILE: '/user/me',

  // Quiz
  GET_QUIZZES: '/quizzes',
  SUBMIT_QUIZ: '/quizzes/submit',

  // Ranking
  GET_RANKINGS: '/user',
  GET_TOTAL_RANKINGS: '/user',
  GET_GAME_RANKING: '/answer',
};
