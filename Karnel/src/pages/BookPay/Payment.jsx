import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookingService from "../../services/BookingService";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");

  useEffect(() => {
    if (!bookingId) {
      toast.error("Invalid booking ID");
      navigate("/");
      return;
    }
   
    navigate(`/web-payment?bookingId=${bookingId}`);
  }, [bookingId, navigate]);

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Redirecting...</h1>
      <p>Please wait while we redirect you to the payment form.</p>
    </div>
  );
}