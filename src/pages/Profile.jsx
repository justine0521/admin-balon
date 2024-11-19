import React, { useRef, useContext, useState, useEffect } from 'react';
import ProfileContext from './ProfileContext';
import Icon from '../images/defaultProfile.png';
import axios from 'axios';
import '../App.css';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { MdEdit } from "react-icons/md";
import { set } from 'mongoose';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// AWS S3 setup
const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});

function Profile() {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(Icon); // Default image
    const [activeTab, setActiveTab] = useState('profileInfo');
    const [isEditable, setIsEditable] = useState(false);
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        position: '',
        createdAt: new Date(),
    });
    const [originalProfile, setOriginalProfile] = useState(profile);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateInfoModal, setUpdateInfoModal] = useState(false);
    const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
    const [updateImageModal, setUpdateImageModal] = useState(false);
    const progressBarRef = useRef(null);
    const [timer, setTimer] = useState(3);

    const [passwordErrors, setPasswordErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [inputStyles, setInputStyles] = useState({
        currentPassword: 'border',
        newPassword: 'border',
        confirmPassword: 'border'
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/api/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const profileData = {
                    ...response.data,
                    createdAt: new Date(response.data.createdAt)
                };
                setProfile(profileData);
                setOriginalProfile(profileData);
                setImageUrl(response.data.imageUrl || Icon); 
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (updateInfoModal || updatePasswordModal || updateImageModal) {
            progressBarRef.current.style.animation = `shrink ${timer}s linear forwards`;

            setTimeout(() => {
                setUpdateInfoModal(false);
                setUpdatePasswordModal(false);
                setUpdateImageModal(false);
            }, timer * 1000);
        }
    }, [updateInfoModal, updatePasswordModal, updateImageModal, timer]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            await uploadImage(file);
        }
    };

    const uploadImage = async (file) => {
        const params = {
            Bucket: bucketName,
            Key: `profiles/${file.name}`,
            Body: file,
            ContentType: file.type,
            ACL: 'public-read',
        };

        try {
            const command = new PutObjectCommand(params);
            await s3Client.send(command);
            const url = `https://${bucketName}.s3.amazonaws.com/profiles/${file.name}`;
            setImageUrl(url); // Update image URL state

            // Save the new image URL to the user's profile
            const token = localStorage.getItem('token');
            await axios.patch(`${API_BASE_URL}/api/profile`, { imageUrl: url }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Optionally, update the profile state locally
            setProfile(prevProfile => ({
                ...prevProfile,
                imageUrl: url
            }));
            setUpdateImageModal(true);

        } catch (err) {
            console.error("Error uploading image: ", err);
        }
    };


    function handleButtonClick() {
        fileInputRef.current.click();
    }

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleCancelClick = () => {
        setProfile(originalProfile);
        setIsEditable(false);
    };

    const handleUpdateClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`${API_BASE_URL}/api/profile`, profile, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.setItem('profile', JSON.stringify(response.data));
            setOriginalProfile(response.data);
            setIsEditable(false);
            setUpdateInfoModal(true);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const formatDate = (date) => {
        if (date instanceof Date && !isNaN(date.getTime())) {
            return date.toLocaleDateString();
        }
        return '';
    };

    const handlePasswordChange = async () => {
        let errors = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
        let styles = {
            currentPassword: 'border',
            newPassword: 'border',
            confirmPassword: 'border'
        };

        if (!currentPassword) {
            errors.currentPassword = 'Current password is required';
            styles.currentPassword = 'border-red-500';
        }

        if (newPassword !== confirmPassword) {
            errors.newPassword = 'New password do not match';
            errors.confirmPassword = 'New password do not match';
            styles.newPassword = 'border-red-500';
            styles.confirmPassword = 'border-red-500';
        }

        if (Object.values(errors).some(error => error)) {
            setPasswordErrors(errors);
            setInputStyles(styles);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.patch(`${API_BASE_URL}/api/change-password`, {
                currentPassword,
                newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setPasswordErrors({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setInputStyles({ currentPassword: 'border', newPassword: 'border', confirmPassword: 'border' });
            setUpdatePasswordModal(true);
        } catch (error) {
            console.error('Error updating password:', error);
            setPasswordErrors({ currentPassword: 'Wrong password', newPassword: '', confirmPassword: '' });
            setInputStyles({ currentPassword: 'border-red-500', newPassword: 'border', confirmPassword: 'border' });
        }
    };

    return (
        <section className="px-1 bg-gray-100 ">
            <p className="text-3xl font-semibold text-gray-800">Profile</p>

            <div className="flex flex-wrap justify-between gap-5 mt-5">
                <div className="bg-white shadow-md w-full sm:w-64 max-w-full h-fit p-6 flex flex-col items-center text-center border rounded-2xl">
                    <img src={imageUrl} alt="Profile Preview" className="w-24 h-24 border-2 border-gray-300 rounded-full object-cover"/>
                   
                    <p className="text-xl font-semibold mt-4 text-gray-800">{profile.fullName}</p>
                    <p className="text-sm text-gray-500 mt-1">{profile.email}</p>

                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>

                    <button onClick={handleButtonClick} className="mt-5 bg-green-500 text-white py-1.5 px-4 rounded-md hover:bg-green-600 transition duration-200">
                        Change Profile
                    </button>
                </div>

                <div className="bg-white shadow-md flex-grow p-6 border rounded-2xl">
                    <nav className="border-b mb-4 flex gap-3 text-lg font-medium">
                        <button className={`pb-2 ${activeTab === 'profileInfo' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600 hover:text-green-500' }`} onClick={() => setActiveTab('profileInfo')}>
                            Profile Info
                        </button>

                        <button className={`pb-2 ${activeTab === 'accountSecurity' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600 hover:text-green-500' }`} onClick={() => setActiveTab('accountSecurity')}>
                            Account Security
                        </button>
                    </nav>

                    {activeTab === 'profileInfo' && (
                        <div>
                            <label className='block'>
                                <p className='font-medium text-gray-800'>Full Name:</p>
                                <input type='text' name='fullName' value={profile.fullName} onChange={handleInputChange} disabled={!isEditable} className='border p-2 w-full mt-1 outline-green-500 rounded-lg'/>
                            </label>

                            <label className='block mt-4'>
                                <p className='font-medium text-gray-800'>Email:</p>
                                <input type='email' name='email' value={profile.email} onChange={handleInputChange} disabled={!isEditable} className='border p-2 w-full mt-1 outline-green-500 rounded-lg'/>
                            </label>

                            <label className='block mt-4'>
                                <p className='font-medium text-gray-800'>Position:</p>
                                <input type='text' name='position' value={profile.position} onChange={handleInputChange} disabled className='border p-2 w-full mt-1 outline-green-500 rounded-lg'/>
                            </label>

                            <label className='block mt-4'>
                                <p className='font-medium text-gray-800'>Account Created:</p>
                                <input type='text' value={formatDate(profile.createdAt)} disabled className='border p-2 w-full mt-1 rounded-lg'/>
                            </label>

                            {!isEditable ? (
                                <div className='flex justify-end'>
                                  <button onClick={handleEditClick} className='bg-green-500 hover:bg-green-600 transition duration-200 text-White p-1.5 px-3 mt-4 flex items-center gap-1 rounded-md'>
                                    <MdEdit /> <p>Edit</p>
                                  </button>
                                </div>
                            ) : (
                                <div className='flex justify-end space-x-3'>
                                  <button onClick={handleUpdateClick} className='bg-green-500 hover:bg-green-600 transition duration-200 text-White p-1.5 px-5 mt-4 rounded-md'>Save</button>
                                  <button onClick={handleCancelClick} className='bg-red-500 hover:bg-red-600 transition duration-200 text-White p-1.5 px-5 mt-4 rounded-md'>Cancel</button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'accountSecurity' && (
                        <div>
                            <label className='block'>
                                <p className='font-medium text-gray-800'>Current Password:</p>

                                <input type="password" id="currentPassword" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className={`mt-1 block w-full px-3 py-2 border rounded-lg ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-green-500 sm:text-sm`}/>
                                {passwordErrors.currentPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>}
                            </label>


                            <label className='block mt-4'>
                                <p className='font-medium text-gray-800'>New Password:</p>

                                <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`mt-1 block w-full px-3 py-2 border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500 sm:text-sm`} />
                                
                                {passwordErrors.newPassword && <p className="text-red-500">{passwordErrors.newPassword}</p>}
                            </label>

                            <label className='block mt-4'>
                                <p className='font-medium text-gray-800'>Confirm New Password:</p>

                                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`mt-1 block w-full px-3 py-2 border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500 sm:text-sm`} />
                                {passwordErrors.confirmPassword && <p className="text-red-500">{passwordErrors.confirmPassword}</p>}
                            </label>

                            <div className='flex justify-end space-x-3'>
                                <button onClick={handlePasswordChange} className='bg-green-500 hover:bg-green-600 transition duration-200 text-White p-1.5 px-3 mt-4 rounded-md'>Update Password</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {updateImageModal && (
                <div className="fixed top-5 right-5 bg-green-100 text-green-800 p-4 rounded-md shadow-lg z-20">
                    <p>Profile Picture Updated</p>
                    <div ref={progressBarRef} className="h-1 bg-green-500 mt-2"></div>
                </div>
            )}
            {updateInfoModal && (
                <div className="fixed top-5 right-5 bg-green-100 text-green-800 p-4 rounded-md shadow-lg z-20">
                    <p>Account Updated</p>
                    <div ref={progressBarRef} className="h-1 bg-green-500 mt-2"></div>
                </div>
            )}
            {updatePasswordModal && (
                <div className="fixed top-5 right-5 bg-green-100 text-green-800 p-4 rounded-md shadow-lg z-20">
                    <p>Password Updated</p>
                    <div ref={progressBarRef} className="h-1 bg-green-500 mt-2"></div>
                </div>
            )}
        </section>
    );
}

export default Profile;