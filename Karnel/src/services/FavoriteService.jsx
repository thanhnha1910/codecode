import axios from 'axios';

const API_URL = "http://localhost:5128/api/Favorite";
const FavoriteService = {
    getFavorites: async (userId) => {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response;
    },

    addFavorite: async (userId, tourId) => {
        const response = await axios.post(`${API_URL}/add`, {
            UserID: userId,
            TourID: tourId
        });
        return response;
    },

    removeFavorite: async (userId, tourId) => {
        const response = await axios.delete(`${API_URL}/${userId}/${tourId}`);
        return response;
    },

    checkFavorite: async (userId, tourId) => {
        const response = await axios.get(`${API_URL}/check/${userId}/${tourId}`);
        return response;
    }
};
export default FavoriteService;