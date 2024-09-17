import React from 'react';
import { IoClose } from 'react-icons/io5';

const CertificateDetailsModal = ({ certificate, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 transition-transform transform scale-95 hover:scale-100 duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-green-600">Certificate Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <IoClose className="text-3xl" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <p className="font-medium text-gray-700"><strong>Certificate Type:</strong></p>
                        <p className="text-gray-900">{certificate.certificateType}</p>
                        <p className="font-medium text-gray-700"><strong>Full Name:</strong></p>
                        <p className="text-gray-900">{certificate.fullName}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                        <p className="font-medium text-gray-700"><strong>Contact Number:</strong></p>
                        <p className="text-gray-900">{certificate.contactNumber}</p>
                        <p className="font-medium text-gray-700"><strong>Pick-Up:</strong></p>
                        <p className="text-gray-900">{certificate.pickUp ? 'Yes' : 'No'}</p>
                        <p className="font-medium text-gray-700"><strong>Pick-Up Date:</strong></p>
                        <p className="text-gray-900">{certificate.pickUpDate || 'N/A'}</p>
                        <p className="font-medium text-gray-700"><strong>Payment Method:</strong></p>
                        <p className="text-gray-900">{certificate.paymentMethod}</p>
                        <p className="font-medium text-gray-700"><strong>Reference No:</strong></p>
                        <p className="text-gray-900">{certificate.referenceNo || 'N/A'}</p>
                        <p className="font-medium text-gray-700"><strong>Selected Purpose:</strong></p>
                        <p className="text-gray-900">{certificate.selectedPurpose}</p>
                        <p className="font-medium text-gray-700"><strong>Select Type:</strong></p>
                        <p className="text-gray-900">{certificate.selectType}</p>
                        <p className="font-medium text-gray-700"><strong>Tracking Code:</strong></p>
                        <p className="text-gray-900">{certificate.trackingCode}</p>
                        <p className="font-medium text-gray-700"><strong>Status:</strong></p>
                        <p className="text-gray-900">{certificate.status}</p>
                        <p className="font-medium text-gray-700"><strong>Created At:</strong></p>
                        <p className="text-gray-900">{new Date(certificate.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificateDetailsModal;
