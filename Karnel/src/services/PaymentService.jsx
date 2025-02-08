import axios from 'axios';

const API_URL = 'http://localhost:5128/api/Payment';

const PaymentService = {
  initiatePayment: async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/initiate/${bookingId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to initiate payment');
    }
  },

  capturePayment: async (paymentToken) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/capture`,
        { PaymentToken: paymentToken },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to capture payment');
    }
  },

  getPaymentStatus: async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/status/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  }
};

export default PaymentService;