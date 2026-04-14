import axiosInstance from './axios';

const questionsAPI = {

  // ==================== GET ALL QUESTIONS ====================
  getAllQuestions: async (page = 1, limit = 30) => {
    try {
      const response = await axiosInstance.get(`/questions`, {
        params: { page, limit },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== GET QUESTIONS BY TOPIC ====================
  getQuestionsByTopic: async (topic, page = 1, limit = 30) => {
    try {
      const response = await axiosInstance.get(`/questions/${topic}`, {
        params: { page, limit },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== GET SINGLE QUESTION ====================
  getQuestionDetail: async (questionId) => {
    try {
      const response = await axiosInstance.get(`/questions/detail/${questionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== CREATE QUESTION ====================
  createQuestion: async (topic, question) => {
    try {
      const response = await axiosInstance.post('/questions', {
        topic,
        question,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== UPDATE QUESTION ====================
  updateQuestion: async (questionId, topic, question, answer) => {
    try {
      const response = await axiosInstance.put(`/questions/${questionId}`, {
        topic,
        question,
        answer,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== DELETE QUESTION ====================
  deleteQuestion: async (questionId) => {
    try {
      const response = await axiosInstance.delete(`/questions/${questionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};

export default questionsAPI;