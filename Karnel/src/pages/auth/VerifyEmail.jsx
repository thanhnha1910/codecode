import  { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../services/AuthService.jsx';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
      
        const verifyEmail = async () => {
            if (!token) return;
            
            try {
                const response = await authApi.verifyEmail(token);
                console.log('Verification response:', response); // Add this log
               
                navigate('/login', { replace: true });
            } catch (error) {
                const errorMessage = error.response?.data?.message || 
                                   "Verification link has expired or is invalid";
                console.log('Verification error:', error); // Add this log
                navigate('/login', { replace: true });
            }
        };
    
        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Verifying Email</h2>
                <p className="text-gray-600">Please wait while we verify your email address...</p>
            </div>
        </div>
    );
}

export default VerifyEmail;