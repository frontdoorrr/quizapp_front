import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const contactService = {
  submitInquiry: async (inquiryData) => {
    try {
      const response = await api.post(API_ENDPOINTS.SUBMIT_INQUIRY, inquiryData);
      return response.data;
    } catch (error) {
      console.error('Submit inquiry error:', error);
      throw error;
    }
  },
};
