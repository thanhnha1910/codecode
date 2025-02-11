
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
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                A confirmation email has been sent to your registered email address. Please check your inbox for detailed booking information.
              </p>
            </div>
          </div>
         <div className="c">
         <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              View Home
            </button>
         </div>
          
        </div>
      </div>
    </div>
);
}