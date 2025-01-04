import axios from 'axios';
import {toast} from 'react-toastify';

const API_URL = 'http://localhost:5128/api/Auth';

const authApi = {
    register: async (registerData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, registerData);
            console.log('API Response:', response);
            return response.data;
        } catch (error) {
            console.log('API Error:', error);
            throw error.response?.data || 'Registration failed';
        }
    },

    login: async (loginData) => {
        try {
            const response = await axios.post(`${API_URL}/login`, loginData);
            if (response.data) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));   
            }
            return response.data;
        } catch (error) {
            console.error('Login Error:', error);
            // Đảm bảo trả về message error gốc từ server
            const errorMessage = error.response?.data || 'Login failed';
            console.log('Error message:', errorMessage);
            throw errorMessage; // Ném trực tiếp error message
        }
    },

    verifyEmail: async (token) => {
        try {
            const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
            if (response.data) {
                toast.success('Email verified successfully! You can now login.');
                return response.data;
            }
            throw 'Verification failed';
        } catch (error) {
            throw error.response?.data || 'Verification failed';
        }
    },

    requestPasswordReset: async (email) => {
        try {
            const response = await axios.post(`${API_URL}/request-reset-password`, {email});
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Password reset request failed';
        }
    },

    resetPassword: async (token, newPassword, confirmPassword) => {
        try {
            const response = await axios.post(`${API_URL}/reset-password?token=${token}`, {
                newPassword,
                confirmPassword
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Password reset failed';
        }
    },
    verifyResetToken: async (token) => {
        try {
            const response = await axios.post(`${API_URL}/verify-reset-token`, JSON.stringify(token), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            // Xử lý lỗi và đảm bảo trả về message error từ server
            const errorMessage = error.response?.data?.message || 
                               error.response?.data || 
                               'Invalid or expired reset code';
            throw errorMessage;
        }
    }
};

export default authApi;