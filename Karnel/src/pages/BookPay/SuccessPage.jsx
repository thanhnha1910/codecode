import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentService from "../../services/PaymentService";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const capturePayment = async () => {
      const token = searchParams.get('token');
      if (!token) {
        toast.error("Invalid payment token");
        navigate('/failure');
        return;
      }

      try {
        console.log("Capturing payment with token:", token);
        const response = await PaymentService.capturePayment(token);
        console.log("Capture response:", response);
        
        if (response && response.bookingId) {
          toast.success("Payment completed successfully!");
          navigate('/payment-confirmation', {
            state: {
              bookingId: response.bookingId,
              paymentStatus: response.paymentStatus,
              message: response.message
            }
          });
        } else {
          throw new Error("Invalid payment response");
        }
      } catch (error) {
        console.error("Payment capture error:", error);
        toast.error(error.message || "Failed to process payment");
        navigate('/failure');
      } finally {
        setLoading(false);
      }
    };

    capturePayment();
}, [searchParams, navigate]);
  if (loading) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold">Processing your payment...</h2>
          <p className="text-gray-600 mt-2">Please do not close this window</p>
        </div>
      </div>
    );
  }

  return null;
}