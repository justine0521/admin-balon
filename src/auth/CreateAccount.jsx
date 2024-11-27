import React, { useState } from 'react';
import axios from 'axios';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Profile from '../images/defaultProfile.png';
import { TiCamera } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Swal from 'sweetalert2';
import '../App.css';

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

function CreateAccount({ closeModal }) {
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageUrl: Profile,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
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
        const url = `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/profiles/${file.name}`;
        setFormData(prevData => ({
          ...prevData,
          imageUrl: url
        }));
      } catch (err) {
        console.error("Error uploading image: ", err);
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        imageUrl: Profile
      }));
    }
  };

  const handleFocus = (e) => {
    const fieldId = e.target.id;
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldId]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      fullName: '',
      position: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    let hasError = false;

    if (!formData.fullName) {
      setErrors(prev => ({ ...prev, fullName: 'Full name is required' }));
      hasError = true;
    }

    if (!formData.position) {
      setErrors(prev => ({ ...prev, position: 'Position is required' }));
      hasError = true;
    }

    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      hasError = true;
    }

    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      hasError = true;
    }

    if (hasError) return;

    try {
      const existingAdmins = await axios.get(`${API_BASE_URL}/api/accounts?position=Admin`);
      const emailExists = await axios.get(`${API_BASE_URL}/api/accounts/email/${formData.email}`);

      if (existingAdmins.data.length > 0 && (formData.position.toLowerCase() === 'admin')) {
        setErrors(prev => ({ ...prev, position: 'An admin already exists. Only one admin is allowed.' }));
        return;
      }

      if (emailExists.data.exists) {
        setErrors(prev => ({ ...prev, email: 'An account with this email already exists. Please try another email.' }));
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/accounts`, formData);
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Account created successfully!',
            showConfirmButton: false,
            timer: 2000,
        });

        setFormData({
          fullName: '',
          position: '',
          email: '',
          password: '',
          confirmPassword: '',
          imageUrl: Profile,
        });

        closeModal();  
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(prev => ({ ...prev, email: 'An account with this email already exists.' }));
      } else {
        setErrors(prev => ({ ...prev, general: 'Error creating account: ' + error.message }));
      }
    }

  const handleDeleteAccount = async (userId) => {
    try {
      const user = await axios.get(`${API_BASE_URL}/api/accounts/${userId}`);
      if (user.data.position.toLowerCase() === 'admin') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'You cannot delete or deactivate an admin account.',
        });
        return; 
      }

      const response = await axios.delete(`${API_BASE_URL}/api/accounts/${userId}`);
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Account deleted successfully.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete account: ' + error.message,
      });
    }
  };

  };

  return (
    <section className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-full max-w-lg mx-4 rounded-2xl shadow-xl max-h-[calc(100%-4rem)] overflow-y-auto relative hide-scrollbar">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-2 transition-all" >
          <IoClose size={24} />
        </button>

        <header className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Fill in the details to create a new account</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <img src={formData.imageUrl} alt="Preview" className="w-full h-full border border-gray-300 rounded-full object-cover"/>
              <label className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer hover:bg-green-600 transition-all">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                <TiCamera size={20} />
              </label>
            </div>
            <p className="text-sm text-gray-500">Upload a profile picture</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="fullName" className="font-medium text-gray-700">Name</label>
              <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} onFocus={handleFocus} className={`w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500`}/>
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="position" className="font-medium text-gray-700">Position</label>
              <input type="text" id="position" value={formData.position} onChange={handleChange} onFocus={handleFocus} className={`w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500`} />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            <div>
              <label htmlFor="email" className="font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} onFocus={handleFocus} className={`w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500`}/>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="font-medium text-gray-700">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} onFocus={handleFocus} className={`w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500`} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="font-medium text-gray-700">Confirm Password</label>
              <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onFocus={handleFocus} className={`w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500`} />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <button type="submit" className="w-full font-medium bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all">
              Create Account
            </button>
          </div>

          {errors.general && <p className="text-red-500 text-sm text-center mt-2">{errors.general}</p>}
        </form>
      </div>
    </section>
  );
}

export default CreateAccount;
