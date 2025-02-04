import axios from "axios";

const API_URL = "http://localhost:5128/api/Review";

const reviewApi = {
    getReviewsForTour: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching review data", error);
        }
    }
};

export default reviewApi;