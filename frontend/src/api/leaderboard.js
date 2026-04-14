import axiosInstance from './axios';

const leaderboardAPI = {
  // ==================== GET GLOBAL LEADERBOARD ====================
  getGlobalLeaderboard: async (limit = 50) => {
    try {
      const response = await axiosInstance.get('/leaderboard', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message|| error.message;
    }
  },

  // ==================== GET USER RANK ====================
  getUserRank: async () => {
    try {
      const response = await axiosInstance.get('/leaderboard/user/rank');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message|| error.message;
    }
  },
};

export default leaderboardAPI;
