import axios from 'axios';

const API_URL = "http://localhost:5128/api/Booking";

const BookingService = {
  createBooking: async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      console.log("Sending booking data:", bookingData);
      const response = await axios.post(`${API_URL}/Book-Tour`, bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Booking Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to create booking");
    }
  },

  updateBookingInfo: async (bookingId, updateInfo) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/update-info/${bookingId}`, updateInfo, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update booking info");
    }
  },

  getBooking: async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch booking");
    }
  },

  getAllBookings: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
  }
};

export default BookingService;