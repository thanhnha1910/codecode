import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../../services/AuthService";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [verificationStatus, setVerificationStatus] = useState({
        isLoading: true,
        success: false,
        message: ""
    });
    const isCalled = useRef(false); // Track if the function has been called

    useEffect(() => {
        const verifyEmail = async () => {
            console.log('verifyEmail function called'); // Log function call
            if (!token) {
                setVerificationStatus({
                    isLoading: false,
                    success: false,
                    message: "Verification token is missing"
                });
                toast.error("Verification token is missing");
                setTimeout(() => navigate("/login"), 3000);
                return;
            }

            try {
                console.log('Token:', token); // Log the token
                const response = await authApi.verifyEmail(token);
                console.log('Verification response:', response);

                if (response.success) {
                    setVerificationStatus({
                        isLoading: false,
                        success: true,
                        message: response.message
                    });
                    toast.success(response.message);
                } else {
                    setVerificationStatus({
                        isLoading: false,
                        success: false,
                        message: response.message
                    });
                    if (response.message === "ALREADY_VERIFIED") {
                      toast.info("Email has already been verified");
                  } else if (response.message === "TOKEN_EXPIRED") {
                      toast.error("Token has been expired.please request a new one");
                  } else {
                      toast.error(response.message);
                  }

                }
            } catch (error) {
                const errorData = error.response?.data || { message: "Verification failed" };
                console.error('Verification error:', errorData);

                setVerificationStatus({
                    isLoading: false,
                    success: false,
                    message: errorData.message
                });
                toast.error(errorData.message);
            } finally {
                setTimeout(() => navigate("/login"), 3000);
            }
        };

        if (!isCalled.current) {
            isCalled.current = true; // Mark the function as called
            verifyEmail();
        }
    }, [token, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                {verificationStatus.isLoading ? (
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-600">Verifying your email...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        {verificationStatus.success ? (
                            <>
                                <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Successful</h2>
                                <p className="text-green-600">{verificationStatus.message}</p>
                            </>
                        ) : (
                            <>
                                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
                                <p className="text-red-600">{verificationStatus.message}</p>
                            </>
                        )}
                        <p className="text-gray-500 mt-4">Redirecting to login page...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;