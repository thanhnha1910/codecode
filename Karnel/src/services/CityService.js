import axios from "axios";

const API_URL = 'http://localhost:5128/api/City';

const cityApi = {
    getCities: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.log("Error fetching city data", error);
        }
    }
}

export default cityApi;