import { useState, useEffect } from "react";
import AnnouncementModal from "../Modal/AnnouncementModal";
import EditAnnouncementModal from "../Modal/EditAnnouncementModal";
import axios from "axios";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Announcements() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [entriesToShow, setEntriesToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [announcements, setAnnouncements] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openEditModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleEntriesChange = (event) => {
        setEntriesToShow(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
        setCurrentPage(1);
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

    const handleDeleteConfirmation = (announcement) => {
        Swal.fire({
            title: "Delete Announcement",
            text: "Are you sure you want to delete this announcement?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_BASE_URL}/api/announcements/${announcement._id}`);
                    setAnnouncements(announcements.filter((item) => item._id !== announcement._id));
                    Swal.fire({
                        icon: "success",
                        title: "Deleted",
                        text: "Announcement has been deleted successfully.",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to delete the announcement.",
                    });
                    setError(err.message);
                }
            }
        });
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
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    }

    return (
        <section className="hide-scrollbar">
            <div>
                <div className="flex justify-between items-center h-14 bg-gray-100 px-3 w-full border-b-2 border-gray-400 rounded-t-xl">
                    <p className="text-2xl font-semibold">Announcements</p>
                    <div className="flex items-center gap-5">
                        <button
                            onClick={openModal}
                            className="flex items-center gap-x-2 bg-Green text-white rounded-md px-3 py-1 hover:bg-green-500"
                        >
                            <FaPlus /> Announcement
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
                            value={searchInput}
                            onChange={handleSearchChange}
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

                {filteredAnnouncements.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No announcements available.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-Green text-white">
                                <tr>
                                    <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider border border-gray-300">Image</th>
                                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Title</th>
                                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Description</th>
                                    <th className="py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Date Added</th>
                                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center divide-y divide-gray-300">
                                {filteredAnnouncements.slice(startIndex, endIndex).map((announcement, index) => (
                                    <tr key={index} className="hover:bg-white">
                                        <td className="px-4 py-2 flex justify-center items-center">
                                            <img
                                                src={announcement.imageUrl || "https://via.placeholder.com/50"}
                                                alt="Announcement"
                                                className="w-14 h-12 rounded-full object-cover"
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
                                                onClick={() => handleDeleteConfirmation(announcement)}
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
                )}

                {totalPages > 1 && (
                    <div className="flex justify-between items-center p-5">
                        <button onClick={handlePreviousPage} className={`p-2 border border-Green rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`} disabled={currentPage === 1}>
                            Previous
                        </button>

                        <span className='text-sm'>Page {currentPage} of {totalPages}</span>

                        <button onClick={handleNextPage} className={`p-2 border border-Green rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnnouncementModal
                isOpen={isModalOpen}
                onClose={closeModal}
                setAnnouncements={setAnnouncements}
            />
            <EditAnnouncementModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                onSave={handleEditSave}
                announcement={selectedAnnouncement}
            />
        </section>
    );
}

export default Announcements;
