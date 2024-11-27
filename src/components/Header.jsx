import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import '../App.css';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

// Import Icons
import { FaBell, FaUserAlt, FaMoon, FaSun, FaChevronDown } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CERTIFICATE_TYPES = [
  'Barangay Clearance',
  'Certificate of Residency',
  'Certificate of Indigency',
  'Common Law',
  'Business Clearance',
  'Guardianship',
  'First Time Job Seeker',
  'Travel Permit',
  'Certificate For Solo Parent'
];

function Header() {
  const navigate = useNavigate();
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchAllNotifications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/all-certificates`);
        const allCertificates = response.data;

        const validNotifications = allCertificates.filter(notif => {
          if (!notif.createdAt) {
            console.warn('Notification missing createdAt:', notif);
            return false;
          }
          const date = new Date(notif.createdAt);
          if (isNaN(date)) {
            console.warn('Invalid createdAt date:', notif.createdAt, 'in notification:', notif);
            return false;
          }
          return true;
        });

        validNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setNotifications(validNotifications);
        setNotificationCount(validNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchAllNotifications();

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const getCertificateRoute = (certType) => {
    switch (certType) {
      case 'Barangay Clearance':
        return '/barangay-clearance';
      case 'Certificate of Residency':
        return '/certificate-of-residency';
      case 'Certificate of Indigency':
        return '/certificate-of-indigency';
      case 'Common Law':
        return '/common-law';
      case 'Business Clearance':
        return '/business-clearance';
      case 'Guardianship':
        return '/guardianship';
      case 'First Time Job Seeker':
        return '/job-seeker';
      case 'Travel Permit':
        return '/travel-permit';
      case 'Certificate For Solo Parent':
        return '/certificate-for-solo-parent';
      default:
        return '/';
    }
  };

  const timeAgo = (date) => {
    if (!date) {
      console.warn('No date provided for notification');
      return 'Unknown time';
    }

    const createdDate = new Date(date);

    if (isNaN(createdDate)) {
      console.error('Invalid date:', date);
      return 'Invalid date';
    }

    const now = new Date();
    const diffInMinutes = Math.floor((now - createdDate) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else {
      return formatDistanceToNow(createdDate, { addSuffix: true });
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-white w-full h-14 z-10 fixed top-0 flex justify-end items-center pr-8 shadow-md">
      <div className="flex justify-center items-center gap-x-5">
        <button onClick={toggleNotifications} className="relative focus:outline-none">
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
                    <NavLink to={getCertificateRoute(notification.certificateType)} key={notification._id} className="block" onClick={() => setShowNotifications(false)}>
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

        <button className="flex justify-center items-center gap-x-2 focus:outline-none">
          <img src={profileData.imageUrl || 'https://via.placeholder.com/150'} alt="Profile" className="relative w-11 h-11 border border-gray-400 rounded-full object-cover" />
        </button>
      </div>
    </header>
  );
}

export default Header;
