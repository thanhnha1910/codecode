import axios from 'axios';

const API_URL = 'http://localhost:5128/api/Payment';



const PaymentService = {
  capturePayment: async (paymentToken) => {
      try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
              `${API_URL}/capture`,
              { 
                  paymentToken: paymentToken 
              },
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              }
          );
          console.log('Capture payment response:', response.data);
          return response.data;
      } catch (error) {
          console.error('Payment capture error:', error.response || error);
          throw new Error(error.response?.data?.message || 'Failed to capture payment');
      }
  }
};

export default PaymentService;