import axios from 'axios';

  const API_URL = "http://localhost:5128/api/Booking";
    const BookingService ={
        createBooking: async (bookingData) => {
            try {
                console.log("Sending booking data:", bookingData);
                const token = localStorage.getItem('token');
                const response = await axios.post(`${API_URL}/Book-Tour`, bookingData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Booking response:", response.data);
                return response.data;
            } catch (error) {
                console.error("Error creating booking:", error);
                throw error.response?.data || "Booking failed";
            }
        },
        initiatePayment: async (bookingId) => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${API_URL}/Initial-Payment/${bookingId}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Payment response:", response.data);
                
                
                return {
                    paymentUrl: response.data
                };
            } catch (error) {
                console.error("Payment initiation error:", error);
                throw new Error(error.response?.data || "Failed to initiate payment");
            }
        },
        updateBookingInfo: async(bookingId,paymentInfo) =>{
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`${API_URL}/update-info/${bookingId}`, paymentInfo, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return response.data;
            } catch (error) {
                throw error.response?.data || "Update failed";
            }
        }
        
    }
    export default BookingService;