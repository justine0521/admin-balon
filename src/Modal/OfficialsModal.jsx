import { useState } from 'react';
import Profile from '../images/defaultProfile.png';
import { IoClose } from "react-icons/io5";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from 'axios';
import '../App.css'

import { TiCamera } from "react-icons/ti";

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

function OfficialsModal({ isOpen, onClose }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        fullname: '',
        position: '',
        dateAdded: '',
        status: 'Active',
    });

    async function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const params = {
                Bucket: bucketName,
                Key: `officials/${file.name}`,
                Body: file,
                ContentType: file.type,
                ACL: 'public-read',
            };

            try {
                const command = new PutObjectCommand(params);
                await s3Client.send(command);
                const url = `https://${bucketName}.s3.ap-southeast-2.amazonaws.com/officials/${file.name}`;
                setImageUrl(url);
            } catch (err) {
                console.error("Error uploading image: ", err);
            }
        } else {
            setImageUrl(Profile);
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const officialData = {
            ...formData,
            imageUrl
        };

        try {
            await axios.post(`${API_BASE_URL}/api/officials`, officialData);
            onClose();
        } catch (error) {
            console.error('Error saving official data:', error);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-5 w-full max-w-lg mx-4 rounded-2xl shadow-xl max-h-[calc(100%-4rem)] overflow-y-auto relative hide-scrollbar">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-2 transition-all"
                >
                    <IoClose size={24} />
                </button>

                {/* Header */}
                <header className="flex flex-col items-center text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Add New Official</h2>
                    <p className="text-gray-500 mt-2">Fill in the details to add a new barangay official</p>
                </header>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-4">
                            <img
                                src={imageUrl || Profile}
                                alt="Preview"
                                className="w-full h-full border border-gray-300 rounded-full object-cover"
                            />
                            <label className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer hover:bg-green-600 transition-all">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <TiCamera  />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">Upload a profile picture</p>
                    </div>

                    {/* Input Fields */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="fullname" className="font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                id="fullname"
                                placeholder="Enter full name"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="position" className="font-medium text-gray-700">
                                Position
                            </label>
                            <select
                                name="position"
                                id="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">Select Position</option>
                                <option value="Punong Barangay">Punong Barangay</option>
                                <option value="Barangay Kagawad">Sangguniang Barangay Member</option>
                                <option value="SK Chairperson">SK Chairperson</option>
                                <option value="Barangay Secretary">Barangay Secretary</option>
                                <option value="SK Member">SK Member</option>
                                <option value="Barangay Treasurer">Barangay Treasurer</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="dateAdded" className="font-medium text-gray-700">
                                Date Added
                            </label>
                            <input
                                type="date"
                                name="dateAdded"
                                id="dateAdded"
                                value={formData.dateAdded}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="status" className="font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all"
                        >
                            Save Official
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OfficialsModal;
