import api from '../interceptors';
import { API_ENDPOINTS } from '../config';

export const contactService = {
  submitInquiry: async (inquiryData) => {
    try {
      const response = await api.post(API_ENDPOINTS.SUBMIT_INQUIRY, inquiryData);
      return response.data;
    } catch (error) {
      console.error('Submit inquiry error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },
};
