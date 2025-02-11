import axios from "axios";

const API_URL = 'http://localhost:5128/api/Attraction';

const attractionApi = {
    getAttractionsByCity: async (cityName, searchParams) => {
        try {
            const response = await axios.get(`${API_URL}/${cityName}${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching attraction data", error);
        }
    },
    getAttractionByName: async (cityName, attractionName) => {
        try {
            const response = await axios.get(`${API_URL}/detail/${cityName}/${attractionName}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching attraction details", error);
        }
    }
}

export default attractionApi;
