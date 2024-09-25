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

    useEffect(() => {
        const fetchCompletedCertificates = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/completed-certificates`);
                setCompletedCertificates(response.data);
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
            <div className="flex items-center justify-center h-screen">
                <span className="text-lg font-semibold">Loading...</span>
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

    return (
        <section className='w-4/5 h-screen mt-14 p-7 ml-56'>
            <div className='shadow-md rounded-lg border border-gray-100'>
                <div className='flex justify-between bg-gray-100 items-center py-4 px-5 border-b-2 border-black'>
                    <h1 className="text-2xl">Transaction History</h1>
                </div>
                {completedCertificates.length === 0 ? (
                    <div className="p-6 text-center text-lg text-gray-600">
                        No completed certificates found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md">
                            <thead className="bg-green-500 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left">Certificate Type</th>
                                    <th className="py-3 px-4 text-left">Full Name</th>
                                    <th className="py-3 px-4 text-left">Email</th>
                                    <th className="py-3 px-4 text-left">Contact Number</th>
                                    <th className="py-3 px-4 text-left">Details</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {completedCertificates.map((certificate) => (
                                    <tr key={certificate._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4 border-b">{certificate.certificateType}</td>
                                        <td className="py-4 px-4 border-b">{certificate.fullName}</td>
                                        <td className="py-4 px-4 border-b">{certificate.email}</td>
                                        <td className="py-4 px-4 border-b">{certificate.contactNumber}</td>
                                        <td className="py-4 px-4 border-b">
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
