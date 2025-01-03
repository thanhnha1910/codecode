import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import authApi from '../../services/AuthService.js';

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        remember_me: false
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authApi.login(credentials);
            toast.success("Login Successful!");
            navigate('/dashboard');
        } catch (error) {
            console.log("Full error object:", error);

            // Xử lý error message một cách linh hoạt hơn
            let errorMessage;
            if (typeof error === 'string') {
                errorMessage = error;
            } else if (error.response?.data) {
                errorMessage = error.response.data;
            } else if (error.message) {
                errorMessage = error.message;
            } else {
                errorMessage = 'An unexpected error occurred';
            }

            console.log("Processed error message:", errorMessage);

            // Kiểm tra các trường hợp lỗi
            if (typeof errorMessage === 'string') {
                if (errorMessage.toLowerCase().includes('verify') ||
                    errorMessage.toLowerCase().includes('verification')) {
                    toast.error(`Please verify your email before logging in`);
                } else if (errorMessage.toLowerCase().includes('not found') ||
                    errorMessage.toLowerCase().includes('not registered') ||
                    errorMessage.toLowerCase().includes('not exist')) {
                    toast.error(`Email ${credentials.email} is not registered`);
                } else if (errorMessage.toLowerCase().includes('password') ||
                    errorMessage.toLowerCase().includes('incorrect')) {
                    toast.error("Incorrect password");
                } else {
                    toast.error(errorMessage);
                }
            } else {
                toast.error('Login failed. Please try again.');
            }

            setError(errorMessage);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember_me"
                                checked={credentials.remember_me}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Remember me</label>
                        </div>
                        <a href="/request-reset-password"
                           className="text-sm text-blue-600 hover:text-blue-800 font-semibold">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
                    >
                        Sign in
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <button
                            className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                 alt="Facebook"/>
                        </button>
                        <button
                            className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                 alt="Twitter"/>
                        </button>
                        <button
                            className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google"/>
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <a href="/register" className="text-blue-600 hover:text-blue-800 font-semibold">Sign up</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;