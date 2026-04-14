import axiosInstance from './axios';

const userAPI = {
  // ==================== GET PROFILE ====================
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== UPDATE PROFILE ====================
  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/user/update', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // ==================== UPDATE STATS ====================
  updateStats: async (statsData) => {
    try {
      const response = await axiosInstance.put('/user/stats/update', statsData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};

export default userAPI;
