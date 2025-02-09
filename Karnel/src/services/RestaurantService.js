import axios from "axios";

const API_URL = 'http://localhost:5128/api/Restaurant';

const restaurantApi = {
    getRestaurantsByCity: async (cityName, searchParams) => {
        try {
            const response = await axios.get(`${API_URL}/${cityName}${searchParams.toString()}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching restaurant data", error);
        }
    },
    getRestaurantByName: async (restaurantName) => {
        try {
            const response = await axios.get(`${API_URL}/detail/${restaurantName}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching restaurant details", error);
        }
    }
}

export default restaurantApi;
