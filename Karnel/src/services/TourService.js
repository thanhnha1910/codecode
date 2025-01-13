import axios from "axios";

const API_URL = "http://localhost:5128/api/Tour";

const tourApi = {
    getTours: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.log("Error fetching tour data", error);
        }
    },
    searchTours: async (searchTerm) => {
        try {
            const response = await axios.get(`${API_URL}/search?query=${searchTerm}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching tour data", error);
        }
    }
};

export default tourApi;