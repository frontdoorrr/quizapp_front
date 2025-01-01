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

      if (response.data?.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }

      return response.data;
    } catch (error) {
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

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // JWT 토큰 디코딩
      const payload = JSON.parse(atob(token.split('.')[1]));

      // 토큰 만료 확인
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
  },

  getToken: () => {
    if (authService.isAuthenticated()) {
      return localStorage.getItem('token');
    }
    return null;
  }
};
