import axiosInstance from './axios';

const quizAPI = {
  // ==================== GET QUIZ BY TOPIC ====================
  // Fetch quiz questions for a specific topic
  getQuizByTopic: async (topic, limit) => {
  const response = await axiosInstance.get(
    `/quiz/${topic}?limit=${limit}`
  );
  return response.data;
},

  // ==================== SUBMIT QUIZ ====================
  // Submit quiz and get score
  submitQuiz: async (topic, answers, timeTaken) => {
    try {
      const response = await axiosInstance.post('/quiz/submit', {
        topic,
        answers,
        timeTaken,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== GET USER RESULTS ====================
  // Get all quiz results for logged-in user
  getUserResults: async () => {
    try {
      const response = await axiosInstance.get('/quiz/results/list');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== GET RESULT DETAILS ====================
  // Get details of a specific quiz result
  getResultDetail: async (resultId) => {
    try {
      const response = await axiosInstance.get(`/quiz/result/${resultId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};

export default quizAPI;
