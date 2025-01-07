import axios from 'axios';

const API_URL = 'http://localhost:5128/api/PersonalPage';
const profileApi = {
    updateProfile: async (userId, formData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
    
            // Only append fields that have values
            const validatedFormData = new FormData();
            if (formData.get('name')) validatedFormData.append('name', formData.get('name'));
            if (formData.get('gender') !== null) validatedFormData.append('gender', formData.get('gender'));
            if (formData.get('dateOfBirth')) validatedFormData.append('dateOfBirth', formData.get('dateOfBirth'));
            if (formData.get('avatar')) validatedFormData.append('avatar', formData.get('avatar'));
    
            const response = await axios.put(`${API_URL}/${userId}`, validatedFormData, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    getUserProfile: async (userId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            
            const response = await axios.get(`${API_URL}/${userId}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};export default profileApi;
