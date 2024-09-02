import React, { useState, useEffect, useRef } from 'react';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from 'axios';
import { FaCheck, FaSpinner, FaEdit, FaTrash } from 'react-icons/fa'; // Import additional icons

// AWS S3 setup
const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
});

function AdminAnnouncement() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Fetch existing announcements
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/announcements');
                setAnnouncements(response.data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };
        fetchAnnouncements();
    }, []);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            setUploadSuccess(false);

            const params = {
                Bucket: bucketName,
                Key: `announcements/${file.name}`,
                Body: file,
                ContentType: file.type,
                ACL: 'public-read',
            };

            try {
                const command = new PutObjectCommand(params);
                await s3Client.send(command);
                const url = `https://${bucketName}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/announcements/${file.name}`;
                setImageUrl(url);
                setUploadSuccess(true);
            } catch (err) {
                console.error("Error uploading image: ", err);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageUrl) {
            alert('Please upload an image before submitting.');
            return;
        }

        const announcementData = {
            title,
            description,
            imageUrl,
        };

        try {
            if (editingAnnouncement) {
                await axios.put(`http://localhost:5000/api/announcements/${editingAnnouncement._id}`, announcementData);
                alert('Announcement updated successfully!');
                setEditingAnnouncement(null);
            } else {
                await axios.post('http://localhost:5000/api/announcements', announcementData);
                alert('Announcement added successfully!');
            }
            setTitle('');
            setDescription('');
            setImageUrl('');
            setUploadSuccess(false);
            fileInputRef.current.value = '';

            // Refresh announcements list
            const response = await axios.get('http://localhost:5000/api/announcements');
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Error saving announcement:', error);
        }
    };

    const handleEdit = (announcement) => {
        setTitle(announcement.title);
        setDescription(announcement.description);
        setImageUrl(announcement.imageUrl);
        setEditingAnnouncement(announcement);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/announcements/${id}`);
            alert('Announcement deleted successfully!');
            setAnnouncements(announcements.filter(a => a._id !== id));
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    return (
        <section className="p-6 max-w-2xl mx-auto mt-20 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-5">{editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Image</label>
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                required
                                className="mr-2"
                            />
                            <span>
                                {isUploading ? (
                                    <FaSpinner className="animate-spin text-blue-500" />
                                ) : uploadSuccess ? (
                                    <FaCheck className="text-green-500" />
                                ) : null}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                >
                    {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
                </button>
            </form>

            <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Existing Announcements</h3>
                <ul>
                    {announcements.map(announcement => (
                        <li key={announcement._id} className="mb-4 p-4 border rounded shadow-sm">
                            <h4 className="text-lg font-semibold">{announcement.title}</h4>
                            <p>{announcement.description}</p>
                            <img src={announcement.imageUrl} alt={announcement.title} className="w-32 h-32 object-cover mt-2" />
                            <div className="mt-2 flex space-x-2">
                                <button onClick={() => handleEdit(announcement)} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(announcement._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default AdminAnnouncement;
