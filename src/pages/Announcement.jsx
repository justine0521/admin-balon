import { useState, useEffect } from "react";
import AnnouncementModal from "../Modal/AnnouncementModal";
import EditAnnouncementModal from "../Modal/EditAnnouncementModal";
import axios from "axios";
import { FaPlus, FaFileExport, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Announcements() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteModal, setIsdeleteModal] = useState(false);
    const [entriesToShow, setEntriesToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [announcements, setAnnouncements] = useState([]);
    const [searchInput, setSearchInput] = useState(""); // New state for search input
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (announcement) => {
        console.log('Opening edit modal for:', announcement);
        setSelectedAnnouncement(announcement);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const closeDeleteModal = () => {
        setIsdeleteModal(false);
        setSelectedAnnouncement(null);
    };

    const handleEntriesChange = (event) => {
        setEntriesToShow(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value); // Update search input state
        setCurrentPage(1); // Reset to the first page on search
    };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/announcements`);
                const sortedAnnouncements = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAnnouncements(sortedAnnouncements);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAnnouncements();
    }, []);

    const filteredAnnouncements = announcements.filter((announcement) =>
        announcement.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        stripHtmlTags(announcement.description).toLowerCase().includes(searchInput.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAnnouncements.length / entriesToShow);
    const startIndex = (currentPage - 1) * entriesToShow;
    const endIndex = startIndex + entriesToShow;

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleDelete = async () => {
        if (selectedAnnouncement && selectedAnnouncement._id) {
            try {
                await axios.delete(`${API_BASE_URL}/api/announcements/${selectedAnnouncement._id}`);
                setAnnouncements(announcements.filter((announcement) => announcement._id !== selectedAnnouncement._id));
            } catch (err) {
                setError(err.message);
            } finally {
                closeDeleteModal();
            }
        } else {
            console.error("No announcement selected for deletion");
        }
    };

    const handleEditSave = async (updatedAnnouncement) => {
        if (updatedAnnouncement && updatedAnnouncement._id) {
            try {
                await axios.put(`${API_BASE_URL}/api/announcements/${updatedAnnouncement._id}`, updatedAnnouncement);
                setAnnouncements(
                    announcements.map((announcement) =>
                        announcement._id === updatedAnnouncement._id ? updatedAnnouncement : announcement
                    )
                );
            } catch (err) {
                setError(err.message);
            } finally {
                closeEditModal();
            }
        } else {
            console.error("No announcement selected for editing");
        }
    };

    function stripHtmlTags(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    return (
        <section className="w-4/5 h-full mt-14 left-56 p-7 absolute hide-scrollbar">
            <div className="bg-white rounded-xl shadow-md">
                <div className="flex justify-between items-center h-16 bg-gray-100 px-5 w-full border-b-2 border-gray-300 rounded-t-xl">
                    <p className="text-2xl font-semibold">Announcements</p>
                    <div className="flex items-center gap-5">
                        <button
                            onClick={openModal}
                            className="flex items-center gap-x-2 bg-green-500 text-white rounded-md px-3 py-1 hover:bg-green-600"
                        >
                            <FaPlus /> Add Announcement
                        </button>
                        <button className="flex items-center gap-x-2 bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600">
                            <FaFileExport /> Export
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center p-4">
                    <div>
                        <label htmlFor="entries" className="mr-2">Show Entries:</label>
                        <select
                            id="entries"
                            value={entriesToShow}
                            onChange={handleEntriesChange}
                            className="p-1 px-3 border border-gray-300 rounded-md"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    <form>
                        <label htmlFor="search" className="mr-2">Search:</label>
                        <input
                            type="text"
                            id="search"
                            value={searchInput} // Set input value from state
                            onChange={handleSearchChange} // Handle input changes
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-green-500"
                        />
                    </form>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <div className="loading">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    )}

                    {error && (
                    <p className="bg-red-100 text-red-600 border border-red-500 px-4 py-2 rounded-md">
                        Error: {error}
                    </p>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-green-500 text-white">
                            <tr>
                                <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Image</th>
                                <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Title</th>
                                <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Description</th>
                                <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Date Added</th>
                                <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-white divide-y divide-gray-300">
                            {Array.isArray(filteredAnnouncements) &&
                                filteredAnnouncements.slice(startIndex, endIndex).map((announcement, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 flex justify-center items-center">
                                            <img
                                                src={announcement.imageUrl || "https://via.placeholder.com/50"}
                                                alt="Announcement"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-2">{announcement.title}</td>
                                        <td className="px-4 py-2">
                                            {stripHtmlTags(announcement.description).length > 100
                                                ? `${stripHtmlTags(announcement.description).substring(0, 100)}...`
                                                : stripHtmlTags(announcement.description)}
                                        </td>
                                        <td className="px-4 py-2">{new Date(announcement.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 space-x-2">
                                            <button
                                                onClick={() => openEditModal(announcement)}
                                                title="Edit"
                                                className="text-xl text-blue-500 hover:text-blue-700"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedAnnouncement(announcement);
                                                    setIsdeleteModal(true);
                                                }}
                                                title="Delete"
                                                className="text-xl text-red-500 hover:text-red-700"
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="flex justify-between items-center p-5">
                <button
                    onClick={handlePreviousPage}
                    className={`p-2 border border-Green rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className={`p-2 border border-Green rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            <AnnouncementModal isOpen={isModalOpen} onClose={closeModal} />
            {isEditModalOpen && selectedAnnouncement &&
                (
                    <EditAnnouncementModal
                        isOpen={isEditModalOpen}
                        onClose={closeEditModal}
                        announcement={selectedAnnouncement}
                        onSave={handleEditSave} />
                )
            }
            {deleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <IoWarningOutline size={24} className="text-red-500" />
                            <h2 className="text-xl font-semibold">Delete Announcement</h2>
                        </div>
                        <p>Are you sure you want to delete this announcement?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Announcements;
