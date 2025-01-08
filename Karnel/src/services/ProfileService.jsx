import axios from 'axios';

const API_URL = 'http://localhost:5128/api/PersonalPage';

const profileApi = {
  updateProfile: async (userId, formData) => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    };
    console.log('Request config:', config);
    console.log('FormData contents:', Array.from(formData.entries()));
    
    const response = await axios.put(`${API_URL}/update/${userId}`, formData, config);
    console.log('Update profile response:', response.data);
    return response.data;
  },
  getUserProfile: async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_URL}/${userId}`, config);
    return response.data;
  },
};

export default profileApi;