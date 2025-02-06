import axios from "axios";

const API_URL = "http://localhost:5128/api/Tour";

const tourApi = {
    getTours: async (searchParams) => {
        try {
            const response = await axios.get(`${API_URL}?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching tour data", error);
        }
    },
    getTopTours: async () => {
        try {
            const response = await axios.get(`${API_URL}/top`);
            return response.data;
        } catch (error) {
            console.log("Error fetching top tour data", error);
        }
    },
    getTourById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching tour data", error);
        }
    }
};

export default tourApi;