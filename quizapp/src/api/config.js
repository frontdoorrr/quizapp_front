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
  GET_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',

  // Quiz
  GET_QUIZZES: '/quizzes',
  GET_QUIZ: '/quiz',
  SUBMIT_QUIZ: '/quiz/submit',

  // Ranking
  GET_RANKINGS: '/rankings',
  GET_USER_RANKING: '/ranking/user',
};
