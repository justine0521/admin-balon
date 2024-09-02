import { useState, useEffect } from "react";
import axios from 'axios';

// IMPORT ICONS
import { FaCertificate } from "react-icons/fa6";

function Home() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [barangayClearanceCount, setBarangayClearanceCount] = useState(0);
    const [residencyCertificateCount, setResidencyCertificateCount] = useState(0);
    const [indigencyCertificateCount, setIndigencyCertificateCount] = useState(0);
    const [businessClearanceCount, setBusinessClearanceCount] = useState(0);
    const [lowIncomeCertificateCount, setLowIncomeCertificateCount] = useState(0);
    const [soloParentCertificateCount, setSoloParentCertificateCount] = useState(0);
    const [deathCertificateCount, setDeathCertificateCount] = useState(0);
    const [goodMoralCertificate, setGoodMoralCertificateCount] = useState(0);
    const [newResidentCertificateCount, setNewResidentCertificateCount] = useState(0);
    const [noPropertyCertificateCount, setNoPropertyCertificateCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/certificates');
                setData(response.data);

                const brgyClearanceCount = response.data.filter(cert => cert.certId === 1).length;
                const certResidencyCount = response.data.filter(cert => cert.certId === 2).length;
                const certIndigencyCount = response.data.filter(cert => cert.certId === 3).length;
                const certLowIncomeCount = response.data.filter(cert => cert.certId === 4).length;
                const businessClearanceCount = response.data.filter(cert => cert.certId === 5).length;
                const certDeathCount = response.data.filter(cert => cert.certId === 6).length;
                const certNoPropertyCount = response.data.filter(cert => cert.certId === 7).length;
                const certGoodMoralCount = response.data.filter(cert => cert.certId === 8).length;
                const certNewResidentCount = response.data.filter(cert => cert.certId === 9).length;
                const certSoloParentCount = response.data.filter(cert => cert.certId === 10).length;

                setBarangayClearanceCount(brgyClearanceCount);
                setResidencyCertificateCount(certResidencyCount);
                setIndigencyCertificateCount(certIndigencyCount);
                setBusinessClearanceCount(businessClearanceCount);
                setLowIncomeCertificateCount(certLowIncomeCount);
                setSoloParentCertificateCount(certSoloParentCount);
                setDeathCertificateCount(certDeathCount);
                setGoodMoralCertificateCount(certGoodMoralCount);
                setNewResidentCertificateCount(certNewResidentCount);
                setNoPropertyCertificateCount(certNoPropertyCount);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <section className="w-4/5 h-full mt-14 left-56 p-3 absolute">
            <div className='flex flex-wrap gap-3'>

                <div className='w-72 h-32 p-3 flex  items-center rounded shadow-xl'>
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{barangayClearanceCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold'>{barangayClearanceCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Barangay Clearance</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{residencyCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{residencyCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Residency</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{indigencyCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{indigencyCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Indigency</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{lowIncomeCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{lowIncomeCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Low Income</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{businessClearanceCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{businessClearanceCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>
                        <p className='font-semibold text-green-500 flex justify-end'>Business Clearance</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{deathCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{deathCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Death</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{noPropertyCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{noPropertyCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of No Property</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5 '>
                            <div>
                                <p className='text-3xl font-semibold'>{goodMoralCertificate}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{goodMoralCertificate}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of Good Moral</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{newResidentCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{newResidentCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate of New Resident</p>
                    </div>
                </div>

                <div className='w-72 h-32 p-3 flex justify-around items-center rounded shadow-xl' >
                    <FaCertificate className='text-6xl text-green-500' />

                    <div className='space-y-3 flex-col justify-end w-full'>
                        <div className='flex justify-end gap-5'>
                            <div>
                                <p className='text-3xl font-semibold'>{soloParentCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Current</p>
                            </div>

                            <div>
                                <p className='text-3xl font-semibold'>{soloParentCertificateCount}</p>
                                <p className='text-sm text-gray-500'>Total</p>
                            </div>
                        </div>

                        <p className='font-semibold text-green-500 flex justify-end'>Certificate for Solo Parent</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Home