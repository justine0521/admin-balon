import { useState, useEffect } from "react";
import axios from 'axios';

// IMPORT ICONS
import { FaCertificate } from "react-icons/fa6";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
    const [data, setData] = useState([]);
    const [completedData, setCompletedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentCounts, setCurrentCounts] = useState({
        barangayClearance: 0,
        residencyCertificate: 0,
        indigencyCertificate: 0,
        businessClearance: 0,
        lowIncomeCertificate: 0,
        soloParentCertificate: 0,
        deathCertificate: 0,
        goodMoralCertificate: 0,
        newResidentCertificate: 0,
        noPropertyCertificate: 0
    });

    const [totalCounts, setTotalCounts] = useState({
        barangayClearance: 0,
        residencyCertificate: 0,
        indigencyCertificate: 0,
        businessClearance: 0,
        lowIncomeCertificate: 0,
        soloParentCertificate: 0,
        deathCertificate: 0,
        goodMoralCertificate: 0,
        newResidentCertificate: 0,
        noPropertyCertificate: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [currentResponse, completedResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/certificates`),
                    axios.get(`${API_BASE_URL}/api/completed-certificates`)
                ]);

                const currentData = currentResponse.data;
                const completedData = completedResponse.data;

                // Helper function to calculate counts
                const calculateCounts = (certId, data) => {
                    return data.filter(cert => cert.certId === certId).length;
                };

                // Calculate current counts
                setCurrentCounts({
                    barangayClearance: calculateCounts(1, currentData),
                    residencyCertificate: calculateCounts(2, currentData),
                    indigencyCertificate: calculateCounts(3, currentData),
                    businessClearance: calculateCounts(5, currentData),
                    lowIncomeCertificate: calculateCounts(4, currentData),
                    soloParentCertificate: calculateCounts(10, currentData),
                    deathCertificate: calculateCounts(6, currentData),
                    goodMoralCertificate: calculateCounts(8, currentData),
                    newResidentCertificate: calculateCounts(9, currentData),
                    noPropertyCertificate: calculateCounts(7, currentData)
                });

                // Calculate total counts
                const calculateTotalCounts = (certId) => {
                    const currentCount = calculateCounts(certId, currentData);
                    const completedCount = calculateCounts(certId, completedData);
                    return currentCount + completedCount;
                };

                setTotalCounts({
                    barangayClearance: calculateTotalCounts(1),
                    residencyCertificate: calculateTotalCounts(2),
                    indigencyCertificate: calculateTotalCounts(3),
                    businessClearance: calculateTotalCounts(5),
                    lowIncomeCertificate: calculateTotalCounts(4),
                    soloParentCertificate: calculateTotalCounts(10),
                    deathCertificate: calculateTotalCounts(6),
                    goodMoralCertificate: calculateTotalCounts(8),
                    newResidentCertificate: calculateTotalCounts(9),
                    noPropertyCertificate: calculateTotalCounts(7)
                });

                setLoading(false);
            } catch (error) {
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

                {/* Barangay Clearance */}
                <div className='w-72 h-32 p-3 flex items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.barangayClearance}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.barangayClearance}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Barangay Clearance</p>
                    </div>
                </div>

                {/* Certificate of Residency */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.residencyCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.residencyCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Residency</p>
                    </div>
                </div>

                {/* Certificate of Indigency */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.indigencyCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.indigencyCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Indigency</p>
                    </div>
                </div>

                {/* Certificate of Low Income */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.lowIncomeCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.lowIncomeCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Low Income</p>
                    </div>
                </div>

                {/* Business Clearance */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.businessClearance}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.businessClearance}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Business Clearance</p>
                    </div>
                </div>

                {/* Certificate of Death */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.deathCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.deathCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Death</p>
                    </div>
                </div>

                {/* Certificate of No Property */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.noPropertyCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.noPropertyCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of No Property</p>
                    </div>
                </div>

                {/* Certificate of Good Moral Character */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.goodMoralCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.goodMoralCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Good Moral</p>
                    </div>
                </div>

                {/* Certificate of New Resident */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.newResidentCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.newResidentCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of New Resident</p>
                    </div>
                </div>

                {/* Solo Parent Certificate */}
                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />
                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{currentCounts.soloParentCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{totalCounts.soloParentCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Solo Parent Certificate</p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Home;
