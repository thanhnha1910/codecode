import axios from "axios";

const API_URL = 'http://localhost:5128/api/Resort';

const hotelApi = {
    getResorts: async (searchParams) => {
        try {
            const response = await axios.get(`${API_URL}?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching resort data", error);
        }
    },
    getResortByName: async (resortName, searchParams ) => {
        try {
            const response = await axios.get(`${API_URL}/detail/${resortName}?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching resort detail", error);
        }
    }
}

export default hotelApi;
