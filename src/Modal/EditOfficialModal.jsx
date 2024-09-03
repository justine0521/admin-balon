import { useState, useEffect } from 'react';
import Profile from '../images/defaultProfile.png';
import { IoClose } from "react-icons/io5";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from 'axios';

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

function EditOfficialModal({ isOpen, onClose, officialData, onUpdateOfficial }) {
    const [imageUrl, setImageUrl] = useState(Profile);
    const [formData, setFormData] = useState({
        fullname: '',
        position: '',
        dateAdded: '',
        status: '',
    });

    useEffect(() => {
        if (officialData) {
            setFormData({
                fullname: officialData.fullname,
                position: officialData.position,
                dateAdded: officialData.dateAdded,
                status: officialData.status,
            });
            setImageUrl(officialData.imageUrl || Profile);
        }
    }, [officialData]);

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

        const updatedOfficial = {
            ...formData,
            imageUrl
        };

        try {
            console.log('Updating official with data:', updatedOfficial); // Log the data being sent
            const response = await axios.put(`${API_BASE_URL}/api/officials/${officialData._id}`, updatedOfficial);
            onUpdateOfficial(response.data);
            onClose();
        } catch (error) {
            console.error('Error updating official data:', error.response ? error.response.data : error.message);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50 overflow-auto">
            <div className="bg-white p-6 w-full max-w-lg mx-4 rounded-lg shadow-lg">
                <header className="flex justify-between items-center text-lg border-b-2 border-green-500 pb-3 mb-4">
                    <h2 className="text-xl font-semibold">Edit Official</h2>
                    <button onClick={onClose} className="text-red-500 text-2xl hover:bg-gray-200 rounded-full p-1"><IoClose /></button>
                </header>

                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center'>
                        <img src={imageUrl} alt="Preview" className="w-32 h-32 border border-gray-300 rounded-full object-cover mb-4" />
                        <input onChange={handleImageChange} type="file" accept="image/*" className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500" />
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className="flex flex-col">
                            <label htmlFor="fullname" className="font-medium">Full Name</label>
                            <input
                                type="text"
                                name="fullname"
                                id="fullname"
                                placeholder="Full Name"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="position" className="font-medium">Position</label>
                            <select
                                name="position"
                                id="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
                            >
                                <option value="">Select Official Position</option>
                                <option value="Punong Barangay">Punong Barangay</option>
                                <option value="Barangay Kagawad">Sangguniang Barangay Member</option>
                                <option value="SK Chairperson">SK Chairperson</option>
                                <option value="Barangay Secretary">Barangay Secretary</option>
                                <option value="SK Member">SK Member</option>
                                <option value="Barangay Treasurer">Barangay Treasurer</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="dateAdded" className="font-medium">Date Added</label>
                            <input
                                type="date"
                                name="dateAdded"
                                id="dateAdded"
                                value={formData.dateAdded}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="status" className="font-medium">Status</label>
                            <select
                                name="status"
                                id="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditOfficialModal;
