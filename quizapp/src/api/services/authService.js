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
      // 요청 데이터 구조화
      const registerData = {
        username: userData.username,
        nickname: userData.nickname,
        email: userData.email,
        phone_number: userData.phoneNumber,  // 백엔드 네이밍 컨벤션에 맞춤
        password: userData.password
      };

      const response = await api.post(API_ENDPOINTS.REGISTER, registerData);
      
      if (response.data?.message) {
        console.log('Registration success:', response.data.message);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      
      // 에러 메시지 한글화
      if (error.response?.status === 400) {
        if (error.response.data?.detail?.includes('username')) {
          throw new Error('이미 사용 중인 아이디입니다.');
        }
        if (error.response.data?.detail?.includes('email')) {
          throw new Error('이미 사용 중인 이메일입니다.');
        }
        if (error.response.data?.detail?.includes('nickname')) {
          throw new Error('이미 사용 중인 닉네임입니다.');
        }
        if (error.response.data?.detail?.includes('phone_number')) {
          throw new Error('이미 등록된 전화번호입니다.');
        }
      }
      
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
