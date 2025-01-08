import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOpenInNew } from 'react-icons/md';
import CertificateDetailsModal from '../Modal/CertificateDetailsModal'; // Import the modal component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TransactionHistory = () => {
    const [completedCertificates, setCompletedCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCompletedCertificates = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/completed-certificates`);

                const sortedCertificates = response.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setCompletedCertificates(sortedCertificates);
                setLoading(false);
            } catch (error) {
                setError('Error fetching transaction history');
                setLoading(false);
            }
        };

        fetchCompletedCertificates();
    }, []);

    const handleViewDetails = (certificate) => {
        setSelectedCertificate(certificate);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCertificate(null);
    };

    if (loading) {
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

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-lg font-semibold text-red-500">{error}</span>
            </div>
        );
    }

    // Search filter function with handling for undefined properties
    const filteredCertificates = completedCertificates.filter((certificate) =>
        (certificate.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (certificate.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (certificate.certificateType?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    );

    return (
        <section className=''>
            <div className=''>
                <div className='flex justify-between px-3 items-center py-3 '>
                    <h1 className="text-2xl font-semibold whitespace-nowrap">Transaction History</h1>

                    <form>
                        <label htmlFor="search">Search: </label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-green"
                        />
                    </form>
                </div>
                {filteredCertificates.length === 0 ? (
                    <div className="p-6 text-center text-lg text-gray-600">
                        No completed certificates found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full  shadow-md">
                            <thead className="bg-green-500 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">Certificate Type</th>
                                    <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">Requested By</th>
                                    <th className="py-3 px-4 text-left font-semibold">Email</th>
                                    <th className="py-3 px-4 text-left font-semibold">Details</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {filteredCertificates.map((certificate) => (
                                    <tr key={certificate._id} className="hover:bg-white transition-colors">
                                        <td className="py-4 px-4 border-b text-sm">{certificate.certificateType}</td>
                                        <td className="py-4 border-b text-sm">{certificate.fullName}</td>
                                        <td className="py-4 border-b text-sm">{certificate.email}</td>
                                        <td className="py-4 border-b text-sm">
                                            <button
                                                onClick={() => handleViewDetails(certificate)}
                                                className="text-green-600 font-semibold flex items-center gap-1">
                                                <MdOpenInNew className="text-lg" /> View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {isModalOpen && selectedCertificate && (
                <CertificateDetailsModal
                    certificate={selectedCertificate}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
};

export default TransactionHistory;
