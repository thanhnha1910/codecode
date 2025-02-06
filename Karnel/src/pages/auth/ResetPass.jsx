import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authApi from "../../services/AuthService.jsx";

function ResetPass() {
    const token = localStorage.getItem('resetToken');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (!token) {
            toast.error('Invalid or missing reset token');
            navigate('/request-reset-password');
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Validate passwords match
        if (name === 'confirmPassword') {
            setPasswordError(value !== formData.newPassword ? 'Passwords do not match' : '');
        } else if (name === 'newPassword') {
            setPasswordError(formData.confirmPassword && value !== formData.confirmPassword ? 'Passwords do not match' : '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        // Validate password length
        if (formData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await authApi.resetPassword(token, formData.newPassword, formData.confirmPassword);
            console.log("Response from resetPassword:", response);

            // Show success message
            toast.success("Password has been reset successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });

            // Navigate after delay
            setTimeout(() => {
                localStorage.removeItem('resetToken');
                navigate('/login', { 
                    state: { resetSuccess: true }
                });
            }, 2500);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 
                               err.message || 
                               'Password reset failed';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token) return null;

    return (
        <>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Reset Password
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Please enter your new password
                        </p>
                    </div>
                    
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                  
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                   
                                    placeholder="Confirm new password"
                                />
                                {passwordError && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                    ${(isSubmitting || passwordError) ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
                                disabled={isSubmitting || !!passwordError}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Resetting...
                                    </span>
                                ) : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPass;