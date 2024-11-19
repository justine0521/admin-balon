
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('otpVerified'); 
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('token');

    onLogout();
    navigate('/login');
  }, [navigate, onLogout]);

  return null;
};

export default Logout;
