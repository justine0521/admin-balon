import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../images/Logo.png';
import { useNavigate, NavLink } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');  

  useEffect(() => {
    if (!userId || localStorage.getItem('isLoggedIn') === 'false') {
      navigate('/login');
    }
  }, [navigate, userId]);

  const handleBack = () => {
    navigate('/login');
  };

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else if (e.key === 'Backspace') {
      let newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    const email = localStorage.getItem('email');
  
    if (otpCode.length === 4 && email) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/verify-otp`, { email, otp: otpCode });
        
        if (response.status === 200) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('otpVerified', 'true');
          navigate('/');
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'OTP verification failed');
      }
    } else {
      setErrorMessage('Please enter all 4 digits of the OTP');
    }
  };

  return (
    <section className="bg-gray-100 px-10">
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={Logo} alt="Logo" className='h-32'/>
        
        <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
        
        <p className="text-gray-600 mb-6 text-center">We have sent a verification code to your email address</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {otp.map((_, index) => (
              <input key={index} id={`otp-input-${index}`} type="text" maxLength="1" value={otp[index]} onChange={(e) => handleChange(e.target.value, index)}  onKeyDown={(e) => handleKeyDown(e, index)}  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:border-green-500"  />
            ))}
          </div>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <button  type="submit" className="bg-green-500 text-white py-2 w-full px-6 rounded-lg hover:bg-green-600 transition" disabled={otp.join('').length !== 4}>
            Verify
          </button>
        </form>
      </div>
    </section>
  );
}

export default OTPVerification;
