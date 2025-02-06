import axios from 'axios';
const API_URL = "http://localhost:5128/api/Favorite";
const FavoriteService = {
    checkFavorite: (userId, tourId) => {
        const response= axios.get(`${API_URL}/check/${userId}/${tourId}`);
        return response.data

    },
    
    addFavorite: (data) => {
        return axios.post(`${API_URL}/add`, data);
    },
    
    deleteFavorite: (userId, tourId) => {
        return axios.post(`${API_URL}/delete/${userId}/${tourId}`);
    },
    
    getFavorites: (userId) => {
        return axios.get(`${API_URL}/user/${userId}`);
    }
};

export default FavoriteService;
