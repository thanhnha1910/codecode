import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

export default function FailurePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <FaTimesCircle className="text-6xl text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Your payment was not successful. Please try again or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}