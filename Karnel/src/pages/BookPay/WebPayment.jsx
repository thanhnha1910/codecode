import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookingService from "../../services/BookingService";

export default function WebPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");

  const [paymentInfo, setPaymentInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequirements: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentInfo.fullName || !paymentInfo.email || !paymentInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
    
      await BookingService.updateBookingInfo(bookingId, paymentInfo);

      // Proceed to PayPal payment
      const paymentResponse = await BookingService.BookingPayment(bookingId);
      window.location.href = paymentResponse;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process payment");
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Booking Information</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={paymentInfo.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={paymentInfo.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={paymentInfo.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Special Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Requirements
          </label>
          <textarea
            name="specialRequirements"
            value={paymentInfo.specialRequirements}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${
            isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-3 px-4 rounded-md font-medium transition duration-300`}
        >
          {isLoading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}