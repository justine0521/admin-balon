import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaClipboardList } from 'react-icons/fa';
import BarangayClearance from './CertificatePages/BarangayClearance';
import BusinessClearance from './CertificatePages/BusinessClearance';
import CertificateIndigency from './CertificatePages/CertificateIndigency';
import CertificateResidency from './CertificatePages/CertificateResidency';
import CertificateSoloParent from './CertificatePages/CertificateSoloParent';
import CommonLaw from './CertificatePages/CommonLaw';
import Guardianship from './CertificatePages/Guardianship';
import JobSeeker from './CertificatePages/JobSeeker';
import TravelPermit from './CertificatePages/TravelPermit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function NewHero({ isSidebarOpen }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCounts, setCurrentCounts] = useState({});
  const [activeCertificate, setActiveCertificate] = useState(null);

  const CERTIFICATE_TYPES = [
    { title: 'Barangay Clearance', component: <BarangayClearance /> },
    { title: 'Certificate of Residency', component: <CertificateResidency /> },
    { title: 'Certificate of Indigency', component: <CertificateIndigency /> },
    { title: 'Certificate For Solo Parent', component: <CertificateSoloParent /> },
    { title: 'Common Law', component: <CommonLaw /> },
    { title: 'Business Clearance', component: <BusinessClearance /> },
    { title: 'Guardianship', component: <Guardianship /> },
    { title: 'First Time Job Seeker', component: <JobSeeker /> },
    { title: 'Travel Permit', component: <TravelPermit /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/all-certificates`);
        const data = response.data;

        const calculateCounts = (data) => {
          return CERTIFICATE_TYPES.reduce((acc, type) => {
            const count = data.filter((cert) => cert.certificateType === type.title).length;
            acc[type.title] = count;
            return acc;
          }, {});
        };

        const counts = calculateCounts(data);
        setCurrentCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <p className="bg-red-100 text-red-600 border border-red-500 px-4 py-2 rounded-md">
        Error: {error.message}
      </p>
    );
  }

  const cards = CERTIFICATE_TYPES.map((type) => ({
    title: type.title,
    count: currentCounts[type.title] || 0,
    component: type.component,
    icon: <FaClipboardList className="text-white text-2xl" />,
  }));

  return (
    <section className="flex-1 h-full w-full rounded-lg">
      {activeCertificate === null ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <div>
                <h1 className="font-semibold text-gray-700 mb-2">{card.title}</h1>
                <p className="text-3xl font-bold text-gray-900">{card.count}</p>
                <p onClick={() => setActiveCertificate(card)} className="text-sm text-green-500 mt-1 w-fit hover:underline cursor-pointer">
                  Navigate
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-300 to-green-500 h-12 w-12 rounded-full flex items-center justify-center">
                {card.icon}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full">
          {React.cloneElement(activeCertificate.component, {
            setActiveCertificate,
          })}
        </div>
      )}
    </section>
  );
}

export default NewHero;
