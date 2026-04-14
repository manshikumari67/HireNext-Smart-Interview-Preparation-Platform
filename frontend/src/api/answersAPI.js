import axiosInstance from './axios';

const answersAPI = {
  getAnswers: async (questionId) => {
    try {
      const res = await axiosInstance.get(`/answers/${questionId}`);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  createAnswer: async (data) => {
    try {
      const res = await axiosInstance.post('/answers', data);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  likeAnswer: async (id) => {
    try {
      const res = await axiosInstance.put(`/answers/${id}/like`);
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
};

export default answersAPI;