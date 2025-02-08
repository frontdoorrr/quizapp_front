export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  GET_USER_COINS: '/user/coins',
  CHECK_NICKNAME: '/user/check-nickname',
  VERIFY_EMAIL: '/user/check-email',
  SEND_VERIFICATION_EMAIL: '/user/send-verification-email',

  // Quiz
  GET_QUIZZES: '/quizzes',
  SUBMIT_QUIZ: '/quizzes/submit',
  SUBMIT_ANSWER: '/answer', // 정답 제출 엔드포인트 추가

  // Ranking
  GET_RANKINGS: '/user',
  GET_TOTAL_RANKINGS: '/user',
  GET_GAME_RANKING: '/answer',

  // Contact
  SUBMIT_INQUIRY: '/inquiry',
  CONTACT_URL: '/contact',
  RANKING_URL: '/ranking',
  GAME_URL: '/game/current/',
};
