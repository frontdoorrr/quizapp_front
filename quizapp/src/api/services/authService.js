import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const authService = {
  login: async (credentials) => {
    return await api.post(API_ENDPOINTS.LOGIN, credentials);
  },

  register: async (userData) => {
    return await api.post(API_ENDPOINTS.REGISTER, userData);
  },

  logout: async () => {
    return await api.post(API_ENDPOINTS.LOGOUT);
  },
};
