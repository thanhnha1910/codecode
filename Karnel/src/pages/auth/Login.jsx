import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authApi from "../../services/AuthService.jsx";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserProvider.jsx";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  useEffect(() => {
    if (location.state?.resetSuccess) {
      toast.success("Password reset successful. Please login with your new password.");
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await authApi.login(credentials);
      
      if (response) {
        const baseUrl = "http://localhost:5128";
        const avatarUrl = response.avatar 
          ? (response.avatar.startsWith('http') ? response.avatar : `${baseUrl}${response.avatar}`)
          : "/img/User_icon_2.svg.png";

        const userData = {
          id: response.id,
          name: response.name,
          email: response.email,
          role: response.role,
          avatar: avatarUrl
        };

        localStorage.setItem("token", response.token);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success(`Welcome back ${userData.name}!`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        setTimeout(() => {
          if(userData.role === 'ADMIN') {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1500);
      }
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 
        error.response?.data?.message || 
        error.message || 
        'An unexpected error occurred';

      if (errorMessage.includes("attempts remaining")) {
        toast.warning(errorMessage);
      } else if (errorMessage.includes("Account has been locked")) {
        toast.error("Account locked. Please try again after 3 minutes");
        setCredentials(prev => ({ ...prev, password: "" }));
      } else if (errorMessage.includes("Account is locked")) {
        toast.error(errorMessage);
        setCredentials(prev => ({ ...prev, password: "" }));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
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
        theme="light"
      />
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
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
            <a
              href="/request-reset-password"
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
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
              type="button"
              disabled={isSubmitting}
              className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                alt="Facebook"
              />
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                alt="Twitter"
              />
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              className="flex items-center justify-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/506498/google.svg"
                alt="Google"
              />
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;