import React, { useState, useEffect, useRef } from 'react';
import { FaSpinner, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS

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

function EditAnnouncementModal({ announcement, isOpen, onClose, onSave }) {
    const [title, setTitle] = useState(announcement?.title || '');
    const [description, setDescription] = useState(announcement?.description || '');
    const [imageUrl, setImageUrl] = useState(announcement?.imageUrl || '');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (announcement) {
            setTitle(announcement.title);
            setDescription(announcement.description);
            setImageUrl(announcement.imageUrl);
        }
    }, [announcement]);

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

        const updatedAnnouncement = {
            id: announcement._id, // Ensure you include the ID for updating
            title,
            description,
            imageUrl,
        };

        console.log('Submitting updated announcement:', updatedAnnouncement);

        try {
            await axios.put(`${API_BASE_URL}/api/announcements/${announcement._id}`, updatedAnnouncement);
            alert('Announcement updated successfully!');
            onSave(updatedAnnouncement);
            onClose();
        } catch (error) {
            console.error('Error updating announcement:', error);
        }
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h3 className="text-2xl font-bold mb-4">Edit Announcement</h3>
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
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                className="quill-editor-container mb-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Image</label>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
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

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
}

export default EditAnnouncementModal;