import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authApi from "../../service/AuthService";
import { useEffect } from 'react';


function ResetPassWord() {
    const token = localStorage.getItem('resetToken');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false); 
    
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!token) {
            toast.error('Invalid or missing reset token');
           
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; 
    
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
    
        setIsSubmitting(true);
        try {
            const response = await authApi.resetPassword(token, formData.newPassword, formData.confirmPassword);
            
            setSuccess('Password reset successful!');   
            toast.success('Password has been reset successfully')
            
            // Chỉ xóa resetToken, không xóa token chính
            localStorage.removeItem('resetToken');
            
            setTimeout(() => {
                navigate('/login', { state: { fromReset: true } }); // Thêm state để đánh dấu
            }, 2000);
    
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Password reset failed';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    
    if (!token) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Password
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 text-center text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-green-500 text-center text-sm">
                            {success}
                        </div>
                    )}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            autoComplete="new-password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            autoComplete="new-password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassWord;