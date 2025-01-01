import axios from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS, createAuthHeaders } from './config';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
  timeout: 5000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 로그인 요청은 기본 설정 사용
    if (config.url === '/user/login') {
      return config;
    }

    // 그 외 요청에 대해 토큰이 있으면 Authorization 헤더 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        ...createAuthHeaders(token),
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 401 Unauthorized 에러 처리
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // 로그인 페이지로 리다이렉트 (필요한 경우)
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
