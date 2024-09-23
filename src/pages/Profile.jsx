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
                setImageUrl(response.data.imageUrl || Icon); // Set image URL from the API response
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

    // Handle image upload
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
        <section className="w-4/5 h-fit mt-14 left-56 p-7 absolute">
            <p className='text-3xl'>Profile</p>

            <div className='flex flex-w justify-between gap-5 mt-5'>
                <div className='bg-white h-64 w-56 px-5 flex flex-col justify-center items-center border border-gray-300 rounded'>
                    <img src={imageUrl} alt="Profile Preview" style={{ width: '100px', height: '100px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '100px', objectFit: 'cover', }} />
                    <p className='text-2xl'>{profile.fullName}</p>
                    <p className='text-sm mt-2'>{profile.email}</p>

                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />

                    <button onClick={handleButtonClick} className='bg-Green w-full text-White p-2 py-1 mt-5 rounded-md'>
                        Change Profile
                    </button>
                </div>

                <div className='bg-white h-fit w-3/4 border border-gray-300 rounded'>
                    <nav className='border-b text-xl space-x-5 p-3'>
                        <button className={`p-1 ${activeTab === 'profileInfo' ? 'border-b-2 border-b-Green text-Green' : ''} text-lg`} onClick={() => setActiveTab('profileInfo')}>
                            Profile Info
                        </button>

                        <button className={`p-1 ${activeTab === 'accountSecurity' ? 'border-b-2 border-b-Green text-Green' : ''} text-lg`} onClick={() => setActiveTab('accountSecurity')}>
                            Account Security
                        </button>
                    </nav>

                    {activeTab === 'profileInfo' && (
                        <div className='p-4'>
                            <label className='block'>
                                <p>Full Name:</p>
                                <input type='text' name='fullName' value={profile.fullName} onChange={handleInputChange} disabled={!isEditable} className='border p-2 w-full mt-1 outline-green-500' />
                            </label>

                            <label className='block mt-4'>
                                <p>Email:</p>
                                <input type='email' name='email' value={profile.email} onChange={handleInputChange} disabled={!isEditable} className='border p-2 w-full mt-1 outline-green-500' />
                            </label>

                            <label className='block mt-4'>
                                <p>Position:</p>
                                <input type='text' name='position' value={profile.position} onChange={handleInputChange} disabled className='border p-2 w-full mt-1 outline-green-500' />
                            </label>

                            <label className='block mt-4'>
                                <p>Account Created:</p>
                                <input type='text' value={formatDate(profile.createdAt)} disabled className='border p-2 w-full mt-1' />
                            </label>

                            {!isEditable ? (
                                <div className='flex justify-end'>
                                    <button onClick={handleEditClick} className='bg-Green text-White p-2 mt-4 flex items-center gap-1 rounded-md'>
                                        <MdEdit /> <p>Edit</p>
                                    </button>
                                </div>
                            ) : (
                                <div className='flex justify-end space-x-3'>
                                    <button onClick={handleUpdateClick} className='bg-Green text-White p-2 mt-4 rounded-md'>Save</button>
                                    <button onClick={handleCancelClick} className='bg-red-500 text-White p-2 mt-4 rounded-md'>Cancel</button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'accountSecurity' && (
                        <div className='p-4'>
                            <label className='block'>
                                <p>Current Password:</p>

                                <input type="password" id="currentPassword" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className={`mt-1 block w-full px-3 py-2 border ${passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-green-500 sm:text-sm`} />
                                {passwordErrors.currentPassword && <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword}</p>}
                            </label>


                            <label className='block mt-4'>
                                <p>New Password:</p>

                                <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`mt-1 block w-full px-3 py-2 border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-green-500 sm:text-sm`} />

                                {passwordErrors.newPassword && <p className="text-red-500">{passwordErrors.newPassword}</p>}
                            </label>

                            <label className='block mt-4'>
                                <p>Confirm New Password:</p>

                                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`mt-1 block w-full px-3 py-2 border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-green-500 sm:text-sm`} />
                                {passwordErrors.confirmPassword && <p className="text-red-500">{passwordErrors.confirmPassword}</p>}
                            </label>

                            <div className='flex justify-end space-x-3'>
                                <button onClick={handlePasswordChange} className='bg-Green text-White p-2 mt-4 rounded-md'>Update Password</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {updateImageModal && (
                <div className="fixed right-5 top-5 flex items-center justify-center z-50">
                    <div className="bg-green-100 p-5 rounded shadow-lg w-56">
                        <p className="text-center text-gray-600 mb-4">Image Updated</p>
                        <div ref={progressBarRef} className="h-1 bg-green-500"></div>
                    </div>
                </div>
            )}

            {updateInfoModal && (
                <div className="fixed right-5 top-5 flex items-center justify-center z-50">
                    <div className="bg-green-100 p-5 rounded shadow-lg w-56">
                        <p className="text-center text-gray-600 mb-4">Account Updated</p>
                        <div ref={progressBarRef} className="h-1 bg-green-500"></div>
                    </div>
                </div>
            )}

            {updatePasswordModal && (
                <div className="fixed right-5 top-5 flex items-center justify-center z-50">
                    <div className="bg-green-100 p-5 rounded shadow-lg w-56">
                        <p className="text-center text-gray-600 mb-4">Password Updated</p>
                        <div ref={progressBarRef} className="h-1 bg-green-500"></div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Profile;