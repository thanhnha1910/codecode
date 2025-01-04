import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authApi from "../../services/AuthService.jsx";
import { useNavigate } from "react-router-dom";

function RequestResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
        await authApi.requestPasswordReset(email);
        toast.success("Reset code sent to your verified email! The code will expire in 3 minutes.");        setStep(2);
    } catch (err) {
        // Extract the error message properly
        const errorMessage = err.response?.data?.message || 
                           err.response?.data || 
                           err.message || 
                           "Unable to process request";
        
        // Show toast error
        toast.error(typeof errorMessage === 'string' ? 
                   errorMessage : 
                   "Email not found or not verified");
        
        // Set error state with string only
        setError(typeof errorMessage === 'string' ? 
                errorMessage : 
                "Email not found or not verified");
                
        // Don't proceed to next step
        setStep(1);
        
    } finally {
      // Reset trạng thái submit
      setIsSubmitting(false);
  }
};
  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await authApi.verifyResetToken(token);

      // Store token in localStorage for the reset password page
      localStorage.setItem("resetToken", token);
      toast.success("Code verified successfully!");

      navigate("/reset-password");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
      "Reset code has expired or is invalid";
      toast.error(errorMessage);
      setStep(1);
      setToken("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>

        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-center text-sm">{success}</div>
        )}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleTokenSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Reset Code
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={token}
                onChange={(e) => setToken(e.target.value.toUpperCase())}
                maxLength={5}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify Code
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export default RequestResetPassword;
