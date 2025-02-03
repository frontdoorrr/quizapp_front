import api from '../interceptors';
import { API_ENDPOINTS, LOGIN_HEADERS } from '../config';

export const authService = {
  login: async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);    // OAuth2PasswordRequestForm은 username으로 받음
    formData.append('password', password);

    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, formData, {
        headers: LOGIN_HEADERS,
      });

      console.log('Login response:', response);  // 응답 확인

      // 토큰이 access_token 또는 token으로 올 수 있음
      const token = response.data?.access_token || response.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        console.error('No token found in response:', response.data);
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error.response || error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkNickname: async (nickname) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.CHECK_NICKNAME}/${encodeURIComponent(nickname)}`);
      return !response.data.exists; // exists가 true면 사용 불가, false면 사용 가능
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // JWT 토큰 디코딩
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};
