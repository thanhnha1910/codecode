import React, { useState } from "react";import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import authApi from "../../services/AuthService.jsx";



function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
   
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match', {
            position: "top-center"
        });
        return;
    }

    const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: 'USER'
    };

    try {
        await authApi.register(registrationData);
        toast.success('Registration successful! Please check your email for verification. The verification link will expire in 3 minutes.', {
            position: "top-center",
            closeOnClick: true,
            draggable: true
        });
        navigate('/login');
    } catch (error) {
        toast.error(error.message || 'Registration failed', {
            position: "top-center"
        });
    }
};
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Join our community today</p>
          </div>
            
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                  <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Name</label>
                      <input
                          type="text"
                          name="name"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                      />
                  </div>
                    
                  <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                      <input
                          type="email"
                          name="email"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                      />
                  </div>
                    
                  <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
                      <input
                          type="password"
                          name="password"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          autoComplete="new-password"
                      />
                  </div>
                    
                  <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Confirm Password</label>
                      <input
                          type="password"
                          name="confirmPassword"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          autoComplete="new-password"
                      />
                  </div>
              </div>

              <div className="flex items-center">
                  <input
                      type="checkbox"
                      name="agreeToTerms"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                  </label>
              </div>

              {error && <p className="text-red-500 text-xs italic">{error}</p>}

              <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                  Create Account
              </button>

              <div className="text-center">
                  <p className="text-gray-600">
                      Already have an account?{' '}
                      <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold">Sign in</a>
                  </p>
              </div>
          </form>
      </div>
  </div>
);}

export default Register;

<input 
    type="text"
    name="username"
    autoComplete="username"
    style={{display: 'none'}}
/>
