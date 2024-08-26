// Logout.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Logging out...');
    localStorage.removeItem('isLoggedIn'); // Correct key used here
    onLogout();
    navigate('/login');
  }, [navigate, onLogout]);

  return null;
};

export default Logout;
