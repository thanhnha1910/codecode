import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5128/api/Auth";

const authApi = {
  register: async (registerData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, registerData);
      console.log("API Response:", response);
      return response.data;
    } catch (error) {
      console.log("API Error:", error);
      throw error.response?.data || "Registration failed";
    }
  },

  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      if (response.data) {
        localStorage.setItem("token", response.data.token);

        const userData = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          avatar: response.data.avatar,
          role: response.data.role,
        };
        localStorage.setItem("user", JSON.stringify(userData));
      }
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      // Đảm bảo trả về message error gốc từ server
      const errorMessage = error.response?.data || "Login failed";
      console.log("Error message:", errorMessage);
      throw errorMessage; // Ném trực tiếp error message
    }
  },

  verifyEmail: async (token) => {
    try {
        const response = await axios.get(`${API_URL}/verify-email`, {
            params: { token }
        });
        console.log('Verification response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Verification error:', error.response?.data);
        throw error.response?.data || { message: "Verification failed" };
    }
},
  requestPasswordReset: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/request-reset-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Password reset request failed";
    }
  },

  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
        const response = await axios.post(
            `${API_URL}/reset-password?token=${token}`,
            {
                newPassword,
                confirmPassword,
            }
        );
        
  
        console.log("Reset password response:", response);
        
        if (response.status === 200) {
            return {
                success: true,
                message: "Password has been reset successfully!"
            };
        }
        
        throw new Error("Failed to reset password");
    } catch (error) {
        console.error("Reset password error:", error);
        throw error.response?.data || {
            success: false,
            message: "Password reset failed"
        };
    }
},
  verifyResetToken: async (token) => {
    try {
      const response = await axios.post(
        `${API_URL}/verify-reset-token`,
        JSON.stringify(token),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // Xử lý lỗi và đảm bảo trả về message error từ server
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid or expired reset code";
      throw errorMessage;
    }
  },
  changePassword: async (userId, passwordData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/change-password/${userId}`,
        passwordData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to change password";
    }
  }
};

export default authApi;
