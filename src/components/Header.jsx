import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from '../pages/ProfileContext';
import '../App.css';
import { NavLink } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// IMPORT ICONS
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSupervisorAccount } from "react-icons/md";
import { FaBell, FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from 'axios'; // Import axios if you are using it for API calls

function Header() {
  const navigate = useNavigate();
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { imageUrl } = useContext(ProfileContext);

  useEffect(() => {
    // Fetch notification count and notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/certificates`); // Fetch the certificates
        console.log("Fetched notifications:", response.data); // Debug log
        const fetchedNotifications = response.data; // Get the notifications data
        setNotifications(fetchedNotifications); // Set notifications
        setNotificationCount(fetchedNotifications.length); // Set notification count
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const getCertificateRoute = (certId) => {
    switch (certId) {
      case 1:
        return '/barangay-clearance';
      case 2:
        return '/certificate-of-residency';
      case 3:
        return '/certificate-of-indigency';
      case 4:
        return '/certificate-of-low-income';
      case 5:
        return '/business-clearance';
      case 6:
        return '/certificate-of-death';
      case 7:
        return '/certificate-of-no-property';
      case 8:
        return '/certificate-of-good-moral-character';
      case 9:
        return '/certificate-of-registration-for-new-residents';
      case 10:
        return '/certificate-for-solo-parent';
      default:
        return '/'; // Default route if the certificate ID doesn't match
    }
  };

  useEffect(() => {
    // Toggle dark mode class on body
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleDropdown = (dropdown) => {
    switch (dropdown) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        navigate('/logout');
        break;
      default:
        break;
    }
    setDropdownIndex(null);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Function to format time
  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <header className="bg-White w-full h-14 z-10 fixed top-0 flex justify-end items-center pr-8 ring-2 ring-slate-900/10">
      <div className="flex justify-center items-center gap-x-5">
        <button onClick={toggleDarkMode} className="text-lg">
          {isDarkMode ? <FaSun className="text-green-500" /> : <FaMoon />}
        </button>

        <button onClick={toggleNotifications} className="relative">
          <FaBell className="p-1 h-7 w-6 text-gray-700" />
          {notificationCount > 0 && (
            <div className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold">
              {notificationCount}
            </div>
          )}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto custom-scrollbar">
              <div className="p-4 border-b border-gray-200 bg-green-500">
                <p className="text-lg font-semibold text-white text-left">Notifications</p>
              </div>
              <div>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <NavLink
                      to={getCertificateRoute(notification.certId)}
                      key={notification._id}
                    >
                      <div className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                        <p className="text-sm font-medium text-green-500 text-left">{notification.certificateType}</p>
                        <p className="text-xs text-gray-500 text-left">{timeAgo(notification.createdAt)}</p>
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No notifications</div>
                )}
              </div>
            </div>
          )}
        </button>

        <button onClick={() => toggleDropdown(1)} className="flex justify-center items-center gap-x-2">
          <img src={imageUrl} alt="Profile" title="Account" className="w-11 h-11 border border-gray-400 rounded-full object-cover" />
        </button>

        {dropdownIndex === 1 && (
          <div className="absolute top-0 mt-14 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <button onClick={() => handleDropdown('profile')} className="flex items-center px-4 py-2 text-md text-Green hover:bg-gray-100 w-full">
              <FaUserAlt className="mr-2" /> Profile
            </button>
            <button onClick={() => handleDropdown('settings')} className="flex items-center px-4 py-2 text-md text-Blue hover:bg-gray-100 w-full">
              <IoMdSettings className="mr-2" /> Settings
            </button>
            <button onClick={() => handleDropdown('logout')} className="flex items-center px-4 py-2 text-md text-Red hover:bg-gray-100 w-full">
              <BiLogOut className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
