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
      // 백엔드 모델과 일치하는 데이터 구조
      const registerData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        birth: userData.birthDate,    // birth_date -> birth
        phone: userData.phoneNumber,  // phone_number -> phone
        nickname: userData.nickname
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
        if (error.response.data?.detail?.includes('email')) {
          throw new Error('이미 사용 중인 이메일입니다.');
        }
        if (error.response.data?.detail?.includes('nickname')) {
          throw new Error('이미 사용 중인 닉네임입니다.');
        }
        if (error.response.data?.detail?.includes('phone')) {
          throw new Error('이미 등록된 휴대폰 번호입니다.');
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
  },

  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await api.post(API_ENDPOINTS.CHANGE_PASSWORD, {
        current_password: currentPassword,
        new_password: newPassword,
        new_password2: confirmPassword
      });
      return response.data;
    } catch (error) {
      console.error('Password change error:', error.response?.data || error);
      
      // 백엔드 validation 에러 처리
      if (error.response?.data?.detail && Array.isArray(error.response.data.detail)) {
        // 첫 번째 validation 에러 메시지 추출
        const validationError = error.response.data.detail[0];
        if (validationError.ctx?.error) {
          throw new Error(validationError.ctx.error);
        } else if (validationError.msg) {
          // msg에서 "Value error, " 부분 제거
          const errorMsg = validationError.msg.replace('Value error, ', '');
          throw new Error(errorMsg);
        }
      }
      
      // 기본 에러 처리
      if (error.response?.status === 400) {
        if (error.response.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error('현재 비밀번호가 일치하지 않습니다.');
      }
      
      throw error;
    }
  },

  checkNickname: async (nickname) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.CHECK_NICKNAME}/${nickname}`);
      return response.data.exists;
    } catch (error) {
      console.error('Nickname check error:', error);
      throw error;
    }
  },

  verifyEmail: async (email) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.VERIFY_EMAIL}/${encodeURIComponent(email)}`);
      return response.data; // 원래 응답 그대로 반환
    } catch (error) {
      console.error('Email check error:', error);
      throw error;
    }
  },

  sendVerificationEmail: async (email) => {
    try {
      const response = await api.post(API_ENDPOINTS.SEND_VERIFICATION_EMAIL, { email });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('이미 인증된 이메일입니다.');
      }
      throw error;
    }
  },

  verifyToken: async (token, email) => {
    try {
      const response = await api.post(API_ENDPOINTS.VERIFY_EMAIL_TOKEN, { 
        token,
        email
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error('유효하지 않은 인증 토큰입니다.');
      }
      throw error;
    }
  },
};
