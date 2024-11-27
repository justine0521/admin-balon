import React from 'react';
import { IoClose } from 'react-icons/io5';

const CertificateDetailsModal = ({ certificate, onClose }) => {
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };

    const renderCertificateDetails = () => {
        switch (certificate.certificateType) {
            case 'Barangay Clearance':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Full Name:</strong></p>
                        <p className="text-gray-900">{certificate.fullName}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Gender:</strong></p>
                        <p className="text-gray-900">{certificate.gender}</p>
                        <p className="font-medium text-gray-700"><strong>Age:</strong></p>
                        <p className="text-gray-900">{certificate.age}</p>
                        <p className="font-medium text-gray-700"><strong>Birthday:</strong></p>
                        <p className="text-gray-900">{new Date(certificate.birthday).toLocaleDateString()}</p>
                        <p className="font-medium text-gray-700"><strong>Birth Place:</strong></p>
                        <p className="text-gray-900">{certificate.birthPlace}</p>
                        <p className="font-medium text-gray-700"><strong>Civil Status:</strong></p>
                        <p className="text-gray-900">{certificate.civilStatus}</p>
                        <p className="font-medium text-gray-700"><strong>Blood Type:</strong></p>
                        <p className="text-gray-900">{certificate.bloodType}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                        <p className="font-medium text-gray-700"><strong>Purpose:</strong></p>
                        <p className="text-gray-900">{certificate.purpose}</p>
                    </>
                );
            case 'Certificate of Indigency':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Full Name:</strong></p>
                        <p className="text-gray-900">{certificate.fullName}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Civil Status:</strong></p>
                        <p className="text-gray-900">{certificate.civilStatus}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                        <p className="font-medium text-gray-700"><strong>Purpose:</strong></p>
                        <p className="text-gray-900">{certificate.purpose}</p>
                    </>
                );
            case 'Business Clearance':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Owner:</strong></p>
                        <p className="text-gray-900">{certificate.owner}</p>
                        <p className="font-medium text-gray-700"><strong>Business:</strong></p>
                        <p className="text-gray-900">{certificate.business}</p>
                        <p className="font-medium text-gray-700"><strong>Nature of Business:</strong></p>
                        <p className="text-gray-900">{certificate.natureOfBusiness}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                    </>
                );
            case 'Common Law':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Male:</strong></p>
                        <p className="text-gray-900">{certificate.male}</p>
                        <p className="font-medium text-gray-700"><strong>Female:</strong></p>
                        <p className="text-gray-900">{certificate.female}</p>
                        <p className="font-medium text-gray-700"><strong>Tirahan:</strong></p>
                        <p className="text-gray-900">{certificate.tirahan}</p>
                        <p className="font-medium text-gray-700"><strong>Year Together:</strong></p>
                        <p className="text-gray-900">{certificate.yearTogether}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                    </>
                );
            case 'Guardianship':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Guardian:</strong></p>
                        <p className="text-gray-900">{certificate.guardian}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Child:</strong></p>
                        <p className="text-gray-900">{certificate.child}</p>
                        <p className="font-medium text-gray-700"><strong>Birthday of Child:</strong></p>
                        <p className="text-gray-900">{new Date(certificate.birthdayOfChild).toLocaleDateString()}</p>
                        <p className="font-medium text-gray-700"><strong>Place of Birth:</strong></p>
                        <p className="text-gray-900">{certificate.placeOfBirth}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                    </>
                );
            case 'First Time Job Seeker':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Date Request:</strong></p>
                        <p className="text-gray-900">{new Date(certificate.dateRequest).toLocaleDateString()}</p>
                        <p className="font-medium text-gray-700"><strong>Full Name:</strong></p>
                        <p className="text-gray-900">{certificate.fullName}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Birthday:</strong></p>
                        <p className="text-gray-900">{new Date(certificate.birthday).toLocaleDateString()}</p>
                        <p className="font-medium text-gray-700"><strong>Age:</strong></p>
                        <p className="text-gray-900">{certificate.age}</p>
                        <p className="font-medium text-gray-700"><strong>Gender:</strong></p>
                        <p className="text-gray-900">{certificate.gender}</p>
                        <p className="font-medium text-gray-700"><strong>Civil Status:</strong></p>
                        <p className="text-gray-900">{certificate.civilStatus}</p>
                        <p className="font-medium text-gray-700"><strong>Contact Number:</strong></p>
                        <p className="text-gray-900">{certificate.contactNumber}</p>
                        <p className="font-medium text-gray-700"><strong>Education:</strong></p>
                        <p className="text-gray-900">{certificate.education}</p>
                        <p className="font-medium text-gray-700"><strong>Course:</strong></p>
                        <p className="text-gray-900">{certificate.course}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                    </>
                );
            case 'Certificate of Residency':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Full Name:</strong></p>
                        <p className="text-gray-900">{certificate.fullName}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Civil Status:</strong></p>
                        <p className="text-gray-900">{certificate.civilStatus}</p>
                        <p className="font-medium text-gray-700"><strong>Taon:</strong></p>
                        <p className="text-gray-900">{formatDate(certificate.taon)}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                    </>
                );
            case 'Certificate For Solo Parent':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Parent:</strong></p>
                        <p className="text-gray-900">{certificate.parent}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Child:</strong></p>
                        <p className="text-gray-900">{certificate.child}</p>
                        <p className="font-medium text-gray-700"><strong>Date of Birth:</strong></p>
                        <p className="text-gray-900">{formatDate(certificate.dateOfBirth)}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                    </>
                );
            case 'Travel Permit':
                return (
                    <>
                        <p className="font-medium text-gray-700"><strong>Owner:</strong></p>
                        <p className="text-gray-900">{certificate.owner}</p>
                        <p className="font-medium text-gray-700"><strong>Address:</strong></p>
                        <p className="text-gray-900">{certificate.address}</p>
                        <p className="font-medium text-gray-700"><strong>Type of Car:</strong></p>
                        <p className="text-gray-900">{certificate.typeOfCar}</p>
                        <p className="font-medium text-gray-700"><strong>Plate Number:</strong></p>
                        <p className="text-gray-900">{certificate.plateNumber}</p>
                        <p className="font-medium text-gray-700"><strong>Scrap:</strong></p>
                        <p className="text-gray-900">{certificate.scrap}</p>
                        <p className="font-medium text-gray-700"><strong>Driver:</strong></p>
                        <p className="text-gray-900">{certificate.driver}</p>
                        <p className="font-medium text-gray-700"><strong>Driver License:</strong></p>
                        <p className="text-gray-900">{certificate.driverLicense}</p>
                        <p className="font-medium text-gray-700"><strong>When to Travel:</strong></p>
                        <p className="text-gray-900">{new Date(certificate.whenToTravel).toLocaleDateString()}</p>
                        <p className="font-medium text-gray-700"><strong>Where to Travel:</strong></p>
                        <p className="text-gray-900">{certificate.whereToTravel}</p>
                        <p className="font-medium text-gray-700"><strong>Email:</strong></p>
                        <p className="text-gray-900">{certificate.email}</p>
                    </>
                );
            default:
                return <p className="text-gray-900">No details available for this certificate type.</p>;
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[calc(100%-4rem)] overflow-y-auto hide-scrollbar">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-semibold text-green-600">Certificate Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <IoClose className="text-3xl" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {renderCertificateDetails()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateDetailsModal;
