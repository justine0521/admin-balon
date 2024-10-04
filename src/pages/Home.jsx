// Home.js
import { useState, useEffect } from "react";
import axios from 'axios';
import { FaCertificate } from "react-icons/fa6";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentCounts, setCurrentCounts] = useState({});
    const [totalCounts, setTotalCounts] = useState({});

    const CERTIFICATE_TYPES = [
        'Barangay Clearance',
        'Certificate of Residency',
        'Certificate of Indigency',
        'Common Law',
        'Business Clearance',
        'Guardianship',
        'First Time Job Seeker',
        'Travel Permit',
        'Certificate For Solo Parent'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/all-certificates`);
                const data = response.data;

                console.log('All Certificates Data:', data);

                const calculateCounts = (data) => {
                    return CERTIFICATE_TYPES.reduce((acc, type) => {
                        const count = data.filter(cert => cert.certificateType === type).length;
                        console.log(`Count for ${type}:`, count);
                        acc[type] = count;
                        return acc;
                    }, {});
                };

                const currentCounts = calculateCounts(data); 

                console.log('Current Counts:', currentCounts);
                
                const totalCounts = currentCounts; 

                setCurrentCounts(currentCounts);
                setTotalCounts(totalCounts);

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

    return (
        <section className="w-4/5 h-full mt-14 left-56 p-3 absolute">
            <div className='flex flex-wrap gap-3'>
                {CERTIFICATE_TYPES.map((type) => (
                    <div key={type} className='w-72 h-32 p-3 flex items-center rounded shadow-xl'>
                        <FaCertificate className='text-6xl text-green-500' />
                        <div className='space-y-3 flex-col justify-end w-full'>
                            <div className='flex justify-end gap-5'>
                                <div>
                                    <p className='text-3xl font-semibold'>{currentCounts[type] || 0}</p>
                                    <p className='text-sm text-gray-500'>Current</p>
                                </div>
                                <div>
                                    <p className='text-3xl font-semibold'>{totalCounts[type] || 0}</p>
                                    <p className='text-sm text-gray-500'>Total</p>
                                </div>
                            </div>
                            <p className='font-semibold text-green-500 flex justify-end'>{type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Home;
