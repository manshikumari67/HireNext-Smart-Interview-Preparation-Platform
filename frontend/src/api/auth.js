import axiosInstance from './axios';

const authAPI = {

  // ==================== SIGNUP ====================
  signup: async (formData) => {
    try {
      const response = await axiosInstance.post('/auth/signup', {
        name: formData.name || `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });

      return response.data;

    } catch (error) {
      throw error.response?.data?.message || "Signup failed";
    }
  },


  // ==================== SEND OTP ====================
  sendOTP: async (email) => {
    try {
      const response = await axiosInstance.post('/auth/send-otp', { email });

      return response.data;

    } catch (error) {
      throw error.response?.data?.message || "Failed to send OTP";
    }
  },


  // ==================== VERIFY OTP ====================
  verifyOTP: async (email, otp) => {
    try {
      const response = await axiosInstance.post('/auth/verify-otp', {
        email,
        otp,
      });

      return response.data;

    } catch (error) {
      throw error.response?.data?.message || "OTP verification failed";
    }
  },


  // ==================== LOGIN ====================
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      const { token } = response.data;

      // ✅ Save token
      if (token) {
        localStorage.setItem('token', token);
      }

      return response.data;

    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  },


  // ==================== LOGOUT ====================
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

};

export default authAPI;