import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

import Logo from '../images/Logo.png';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          navigate('/');
          onLogin(); // Redirect to dashboard if already logged in
            
        }
    }, [onLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        // credentials
        const Username = 'admin@gmail.com';
        const Password = '123';

        try {
            // Simulate an API call
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username === Username && password === Password) {
                        resolve({ status: 200 });
                    } else {
                        reject(new Error('Invalid credentials'));
                    }
                }, 1000); // Simulate network delay
            });

            if (response.status === 200) {
                // Simulate a loading duration of 3 seconds
                setTimeout(() => {
                    // Save login state to localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    // Trigger the onLogin callback
                    onLogin();
                }, 3000);
            }
        } catch (error) {
            // Handle login error
            setError('Invalid username or password.');
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form className="w-full max-w-md p-8 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg relative">
                <img src={Logo} alt="Logo" className="w-56 -m-28" />
                <h1 className="mt-28 mb-6 text-4xl font-bold text-gray-800">Login</h1>

                <div className="w-full flex flex-col mb-4">
                    <label htmlFor="email" className="text-gray-600 mb-2">Email</label>
                    <div className={`flex items-center border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>
                        <FaUser className="text-gray-600 mx-3" />
                        <input
                            className={`w-full px-3 py-2 rounded-md focus:outline-none ${error ? 'focus:border-red-500' : 'focus:border-green-600'}`}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col mb-6">
                    <label htmlFor="password" className="text-gray-600 mb-2">Password</label>
                    <div className={`relative flex items-center border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}>
                        <FaLock className="text-gray-600 mx-3" />
                        <input
                            className={`w-full px-3 py-2 rounded-md focus:outline-none ${error ? 'focus:border-red-500' : 'focus:border-green-600'}`}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="absolute right-3 cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEye className="text-gray-600" /> :  <FaEyeSlash className="text-gray-600" />}
                        </div>
                    </div>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login;
