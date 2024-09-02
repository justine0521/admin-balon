import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from '../pages/ProfileContext';
import '../App.css';

// IMPORT ICONS
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSupervisorAccount } from "react-icons/md";
import { FaBell, FaUserAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { imageUrl } = useContext(ProfileContext);

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

  return (
    <header className="bg-White w-full h-14 z-10 fixed top-0 flex justify-end items-center pr-8 ring-2 ring-slate-900/10">
      <div className="flex justify-center items-center gap-x-5">
        <button onClick={toggleDarkMode} className="text-lg">
          {isDarkMode ? <FaSun className="text-green-500"/> : <FaMoon />}
        </button>

        <button className="flex justify-between text-Green">
          <FaBell className="p-1 h-7 w-6" />
          <p className="relative flex items-center justify-center w-5 h-5 rounded-full">
            0
          </p>
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
