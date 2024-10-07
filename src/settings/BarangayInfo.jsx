import React, { useRef, useState, useEffect } from 'react';
import Logo from '../images/Logo.png';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import '../App.css';
import { MdModeEdit } from "react-icons/md";

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

function BarangayInfo() {
  const fileInputRef = useRef(null);
  const [barangayName, setBarangayName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [facebook, setFacebook] = useState('');
  const [email, setEmail] = useState('');
  const [logoUrl, setLogoUrl] = useState(Logo); // Default logo
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [updateBarangayInfo, setUpdateBarangayInfo] = useState(false);
  const progressBarRef = useRef(null);
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const fetchBarangayInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/barangay-info`);
        if (response.ok) {
          const data = await response.json();
          setBarangayName(data.name || '');
          setContactNumber(data.contactNumber || '');
          setFacebook(data.facebook || '');
          setEmail(data.email || '');
          setLogoUrl(data.logoUrl || Logo);
        }
      } catch (error) {
        console.error('Error fetching barangay info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBarangayInfo();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const params = {
      Bucket: bucketName,
      Key: `barangay-logos/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const uploadedLogoUrl = `https://${bucketName}.s3.amazonaws.com/barangay-logos/${file.name}`;
      setLogoUrl(uploadedLogoUrl);

      // Save the new logo URL to the server
      await fetch(`${API_BASE_URL}/api/update-barangay-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: barangayName,
          contactNumber,
          facebook,
          email,
          logoUrl: uploadedLogoUrl, // Save the uploaded logo URL
        }),
      });
      setUpdateBarangayInfo(true);
      setIsEditable(false);

    } catch (err) {
      console.error("Error uploading logo: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/update-barangay-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: barangayName,
          contactNumber,
          facebook,
          email,
          logoUrl,
        }),
      });

      if (response.ok) {
        setUpdateBarangayInfo(true);
        setIsEditable(false);
      } else {
        alert('Failed to update barangay info');
      }
    } catch (error) {
      console.error('Error updating barangay info:', error);
    }
  };

  useEffect(() => {
    if (updateBarangayInfo) {
      progressBarRef.current.style.animation = `shrink ${timer}s linear forwards`;

      setTimeout(() => {
        setUpdateBarangayInfo(false);
      }, timer * 1000);
    }
  }, [updateBarangayInfo, timer]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    setIsEditable(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Barangay Information</h1>
        {!isEditable ? (
          <button onClick={handleEditClick} className="flex items-center bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
            <MdModeEdit className="mr-1" />
            Edit
          </button>
        ) : (
          <div className="flex space-x-4">
            <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Save
            </button>
            <button onClick={handleCancelClick} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mb-6">
        <label className="text-lg font-medium text-gray-700 mb-2">Barangay Logo</label>
        <img src={logoUrl} alt="Barangay Logo" className="rounded-full w-36 h-36 object-cover shadow-lg" />

        {isEditable && (
          <>
            <button onClick={handleButtonClick} className="mt-4 bg-gray-200 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-300">
              Change Logo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-lg font-medium text-gray-700">Barangay Name</label>
          <input
            type="text"
            value={barangayName}
            onChange={(e) => setBarangayName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
            readOnly={!isEditable}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
            readOnly={!isEditable}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Facebook Page</label>
          <input
            type="text"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
            readOnly={!isEditable}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
            readOnly={!isEditable}
          />
        </div>
      </div>

      {updateBarangayInfo && (
        <div className="mt-4 relative">
          <p className="text-center font-medium text-gray-600">Updating Barangay Info...</p>
          <div className="progress-bar mt-2 bg-green-500 h-1 w-full rounded-md" ref={progressBarRef}></div>
        </div>
      )}
    </section>
  );
}

export default BarangayInfo;
