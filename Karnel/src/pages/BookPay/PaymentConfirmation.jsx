import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentConfirmation() {
  const location = useLocation();
  const paymentData = location.state;

  if (!paymentData) {
    return <Navigate to="/book" replace />;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <FaCheckCircle className="text-6xl text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <div className="w-full space-y-4">
          <div className="border-t border-b py-4">
            <p className="text-gray-600">Booking ID: <span className="font-semibold">{paymentData.bookingId}</span></p>
            <p className="text-gray-600">Status: <span className="font-semibold text-green-500">{paymentData.paymentStatus}</span></p>
            <p className="text-gray-600">{paymentData.message}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => window.location.href = '/bookings'}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              View My Bookings
            </button>
            <button
              onClick={() => window.location.href = '/tours'}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Browse More Tours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}