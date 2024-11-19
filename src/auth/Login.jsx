import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import Logo from '../images/Logo.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       navigate('/otp-verification');
//       onLogin();
//     }
//   }, [onLogin, navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
  
    if (response.status === 200) {
      const { userId, token } = response.data;
      localStorage.setItem('userId', userId);
      localStorage.setItem('isLoggedIn', 'false'); 
      localStorage.setItem('otpVerified', 'false'); 
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);

      const profileResponse = await axios.get(`${API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.setItem('profile', JSON.stringify(profileResponse.data));

      onLogin();
      navigate('/otp-verification');
    } else {
      setError('Invalid login credentials');
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Login failed');
    setLoading(false);
  }
};
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-md p-8 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg relative" onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" className="w-44 h-44 -m-28" />
        <h1 className="mt-28 mb-6 text-4xl font-bold text-gray-800">Login</h1>

        <div className="w-full flex flex-col mb-4">
          <label htmlFor="email" className="text-gray-600 mb-2">Email</label>
          
          <div className={`flex items-center border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>
            <FaUser className="text-gray-600 mx-3" />
            <input className={`w-full px-3 py-2 rounded-md focus:outline-none ${error ? 'focus:border-red-500' : 'focus:border-green-600'}`} type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>

        <div className="w-full flex flex-col mb-6">
          <label htmlFor="password" className="text-gray-600 mb-2">Password</label>
          
          <div className={`relative flex items-center border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>
            <FaLock className="text-gray-600 mx-3" />
            <input className={`w-full px-3 py-2 rounded-md focus:outline-none ${error ? 'focus:border-red-500' : 'focus:border-green-600'}`} type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            
            <div className="absolute right-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye className="text-gray-600" /> : <FaEyeSlash className="text-gray-600" />}
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button type="submit" className={`w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading} >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
