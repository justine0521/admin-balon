import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "../images/defaultProfile.png";
import LogoContext from "../pages/LogoContext";
import { FaRegBell, FaAngleDown, FaAngleUp, FaUserAlt } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { formatDistanceToNow } from "date-fns";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function timeAgo(dateString) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
}

function NewHeader({ setActiveSection }) {
    const navigate = useNavigate();
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [barangayName, setBarangayName] = useState('');
    const { imageUrl } = useContext(LogoContext);

    useEffect(() => {
        const fetchBarangayInfo = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/barangay-info`);
                if (response.ok) {
                    const data = await response.json();
                    setBarangayName(data.name);
                } else {
                    console.error('Failed to fetch barangay name');
                }
            } catch (error) {
                console.error('Error fetching barangay info:', error);
            }
        };

        fetchBarangayInfo();
    }, []);

    useEffect(() => {
        const fetchAllNotifications = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/all-certificates`);
                const allCertificates = response.data;

                const validNotifications = allCertificates.filter((notif) => {
                    if (!notif.createdAt) {
                        console.warn("Notification missing createdAt:", notif);
                        return false;
                    }
                    const date = new Date(notif.createdAt);
                    if (isNaN(date)) {
                        console.warn("Invalid createdAt date:", notif.createdAt, "in notification:", notif);
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
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setProfileData(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            }
        };

        fetchProfile();
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleDropdown = (dropdown) => {
        switch (dropdown) {
            case "profile":
                setActiveSection("Profile");
                break;
            case "settings":
                setActiveSection("Settings");
                break;
            case "logout":
                navigate("/logout");
                break;
            default:
                break;
        }
        setDropdownIndex(null);
    };

    const toggleDropdownMenu = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const certificateMapping = {
        "Barangay Clearance": "BarangayClearance",
        "Certificate of Residency": "CertificateOfResidency",
        "Certificate of Indigency": "CertificateOfIndigency",
        "Common Law": "CommonLaw",
        "Business Clearance": "BusinessClearance",
        "Travel Permit": "TravelPermit",
        "Guardianship": "Guardianship",
        "First Time Job Seeker": "JobSeeker",
        "Certificate For Solo Parent": "CertificateSoloParent",
    };

    const handleNotificationClick = (certificateType) => {
        const section = certificateMapping[certificateType];
        if (section) {
            setActiveSection(section);
            setShowNotifications(false);
        }
    };

    return (
        <header className="fixed top-0 w-full h-16 flex items-center justify-between px-4 bg-gray-100 shadow-md z-20">
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    <img src={imageUrl} alt="Logo" className="h-12 w-12" />
                    <p className="text-xl">{barangayName}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={toggleNotifications} className="relative focus:outline-none">
                    <FaRegBell className="p-1 h-7 w-6 text-gray-700" />

                    {notificationCount > 0 && (
                        <div className="absolute -top-1.5 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold">
                            {notificationCount}
                        </div>
                    )}

                    {showNotifications && (
                        <div className="absolute -right-16 top-5 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto custom-scrollbar">
                            <div className="p-4 border-b border-gray-200 bg-green-500">
                                <p className="text-lg font-semibold text-white text-left">Notifications</p>
                            </div>

                            <div>
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div key={notification._id} className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer" onClick={() => handleNotificationClick(notification.certificateType)}>
                                            <p className="text-sm font-medium text-green-500 text-left">{notification.certificateType}</p>
                                            <p className="text-xs text-gray-500 text-left">{timeAgo(notification.createdAt)}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">No notifications</div>
                                )}
                            </div>
                        </div>
                    )}
                </button>

                <div className="relative">
                    <div className="flex items-center gap-2">
                        <img src={profileData.imageUrl || Profile} alt="profile" className="h-12 w-12 rounded-full" />
                        <div className="text-left hidden sm:block">
                            <p className="font-semibold text-sm">{profileData.fullName}</p>
                            <p className="text-sm text-gray-400">{profileData.position}</p>
                        </div>
                        <div onClick={() => toggleDropdownMenu(1)}>
                            {dropdownIndex === 1 ? (
                                <FaAngleUp className="transition-transform duration-300 cursor-pointer" />
                            ) : (
                                <FaAngleDown className="transition-transform duration-300 cursor-pointer" />
                            )}
                        </div>

                        {dropdownIndex === 1 && (
                            <div className="absolute top-14 right-0 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <button onClick={() => handleDropdown("profile")} className="flex items-center px-4 py-2 text-md text-green-500 hover:bg-gray-100 w-full">
                                    <FaUserAlt className="mr-2" /> Profile
                                </button>

                                <button onClick={() => handleDropdown("settings")} className="flex items-center px-4 py-2 text-md text-blue-500 hover:bg-gray-100 w-full">
                                    <IoMdSettings className="mr-2" /> Settings
                                </button>

                                <button onClick={() => handleDropdown("logout")} className="flex items-center px-4 py-2 text-md text-red-500 hover:bg-gray-100 w-full">
                                    <BiLogOut className="mr-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NewHeader;
