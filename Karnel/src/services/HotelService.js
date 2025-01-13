import axios from "axios";

const API_URL = 'http://localhost:5128/api/Hotel';

const hotelApi = {
    getHotels: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.log("Error fetching hotel data", error);
        }
    },
    getHotelsById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching hotel data", error);
        }
    },
    getHotelsWithFilter: async (filter) => {
        try {
            const response = await axios.get(`${API_URL}/?${filter}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching hotel data", error);
        }
    }
}

export default hotelApi;