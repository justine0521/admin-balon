import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Profile from '../images/defaultProfile.png';

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

function CreateAccount() {
  const navigate = useNavigate();
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

      if (existingAdmins.data.length > 0 && formData.position === 'Admin') {
        setErrors(prev => ({ ...prev, position: 'An admin already exists. Only one admin is allowed.' }));
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/accounts`, formData);
      if (response.status === 200) {
        alert("Account created successfully!");
        setFormData({
          fullName: '',
          position: '',
          email: '',
          password: '',
          confirmPassword: '',
          imageUrl: Profile,
        });
        navigate('/settings');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(prev => ({ ...prev, email: 'An account with this email already exists.' }));
      } else {
        setErrors(prev => ({ ...prev, general: 'Error creating account: ' + error.message }));
      }
    }
  };

  return (
    <section className="w-4/5 h-screen mt-14 left-56 p-7 absolute">
      <div className='flex justify-center p-10 h-fit bg-gray-100'>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className='flex flex-col items-center mb-4'>
              <img src={formData.imageUrl} alt="Profile Preview" className="w-32 h-32 border border-gray-300 rounded-full object-cover mb-4" />
              <input
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-green-500`}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Position
              </label>
              <input
                type="text"
                id="position"
                value={formData.position}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.position ? 'border-red-500' : 'border-gray-300'} focus:ring-green-500`}
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-green-500`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-green-500`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-green-500`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            {errors.general && (
              <p className="text-red-500 text-center">{errors.general}</p>
            )}

            <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
