import axios from "axios";

const API_URL = 'http://localhost:5128/api/Hotel';

const hotelApi = {
    getHotels: async (searchParams) => {
        try {
            const response = await axios.get(`${API_URL}?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching hotel data", error);
        }
    },
    getHotelByName: async (hotelName, searchParams ) => {
        try {
            const response = await axios.get(`${API_URL}/detail/${hotelName}?${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching hotel detail", error);
        }
    }
}

export default hotelApi;