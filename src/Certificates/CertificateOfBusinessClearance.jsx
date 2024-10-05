import React, { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './Certificates.css';
import LogoContext from '../pages/LogoContext';
import { IoMdSkipBackward } from "react-icons/io";
import { FaPrint } from "react-icons/fa";
import axios from 'axios';

import MarivelesLogo from '../images/Mariveles-Logo.png'
import BarangayLogo from '../images/Logo.png'

import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CertificateOfBusinessClearance() {

    const { id } = useParams(); // Get the ID from the URL
    const [requestDetails, setRequestDetails] = useState(null);
    const [punongBarangay, setPunongBarangay] = useState(null);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/generate-businessClearance/${id}`);
                setRequestDetails(response.data);
            } catch (error) {
                console.error('Error fetching request details:', error);
            }
        };

        const fetchPunongBarangay = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/officials`);
                const punong = response.data.find(official => official.position === 'Punong Barangay');
                setPunongBarangay(punong);
            } catch (error) {
                console.error('Error fetching Punong Barangay details:', error);
            }
        };

        if (id) {
            fetchRequestDetails();
        }
        fetchPunongBarangay(); 
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentDate.getMonth()];

  return (
    <section className='bg-gray-300 fixed top-0 left-0 w-full h-screen z-50 overflow-auto no-scrollbar'>
        <div className="header-container">
                <header className="flex justify-end items-center gap-x-3 h-16 px-5 w-full">
                    <button onClick={handlePrint} className='flex items-center gap-x-2 border border-Blue text-Blue rounded-full py-1 px-3 transition-all ease-in duration-400 hover:bg-Blue hover:text-White'>
                        <FaPrint /> Print Certificate
                    </button>
                    <NavLink to={'/business-clearance'}>
                        <button className='flex items-center border border-red-400 p-1 px-2 transition-all ease-in duration-400 rounded-full text-Red hover:bg-red-500 hover:text-White'>
                            <IoArrowBackOutline /> Back
                        </button>
                    </NavLink>
                </header>
            </div>

        <div className='bg-white h-fit w-full  font-serif'>
            <header className='h-fit p-3 flex justify-evenly items-center opacity-80'>
                <img src={MarivelesLogo} alt="Mariveles Logo" className='h-32 w-32'/>

                <div className='text-center'>
                    <p className='text-sm'>Republic of the Philippines</p>
                    <p className='text-sm'>Province of Bataan</p>
                    <p className='text-sm'>Municipality of Mariveles</p>

                    <h1 className='font-bold font-sans text-xl'>BARANGAY BALON ANITO</h1>

                    <h1 className='text-3xl text-green-900 font-dancing'>Office of the Punong Barangay</h1>
                </div>

                <img src={BarangayLogo} alt="Barangay Logo" className='h-32 w-32'/>
            </header>

            <div className='flex border-y-4 border-black gap-5 bg-fit bg-no-repeat relative' >
                <img src={BarangayLogo} alt="" className='absolute h-full w-full opacity-30 pt-9 pb-2 px-2'/>
                
                <aside className='  py-5 text-xsm flex flex-col gap-y-2 w-[280px] border-r-2 border-black'>
                    <p className='text-center'>KNOW YOUR <br /> BARANGAY OFFICIALS</p>

                    <div className='my-5'>
                        <p className='font-semibold'>Hon.Celso Moral Solano</p>
                        <span className='text- text-green-900 font-bold'>PUNONG BARANGAY</span>
                    </div>

                    <div>
                        <p className='font-semibold'>Hon.Albert Morados Aguilar</p>
                        <span className='text- text-green-900 font-bold'>Barangay Kagawad</span>
                        <p className='text-green-900'>Committee on Infrastructure & Public Works</p>
                        <p className='text-green-900'>Committee on Environment & Protection</p>
                        <p className='text-green-900'>Committee on Agri-Fisheries & Aquatic Resources</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Hon.Manolito Vidal Madarang</p>
                        <span className='text- text-green-900 font-bold'>Barangay Kagawad</span>
                        <p className='text-green-900'>Committee on Appropriation</p>
                        <p className='text-green-900'>Committee on Education</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Hon.Ariel Yumol Esteron</p>
                        <span className='text- text-green-900 font-bold'>Barangay Kagawad</span>
                        <p className='text-green-900'>Committee on Human Rights</p>
                        <p className='text-green-900'>Committee on Justice & Ethics</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Hon.Rogelio Martinez Esteron</p>
                        <span className='text- text-green-900 font-bold'>Barangay Kagawad</span>
                        <p className='text-green-900'>Committee on Land Use</p>
                        <p className='text-green-900'>Committee on Peace & Order</p>
                        <p className='text-green-900'>Committee on Public Safety</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Hon.Jimel Villo Ocampo</p>
                        <span className='text- text-green-900 font-bold'>Barangay Kagawad</span>
                        <p className='text-green-900'>Committee on Ways & Means</p>
                        <p className='text-green-900'>Committee on Rules & Privilages</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Hon.Marlon Reyes Onaya</p>
                        <span className='text- text-green-900 font-bold'>Barangay Kagawad</span>
                        <p className='text-green-900'>Committee on Senior Citizen</p>
                        <p className='text-green-900'>Committee on Person With Disability</p>
                        <p className='text-green-900'>Committee on Livelihood & Cooperatives</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Hon.Annablle Campo Masangkay</p>
                        <span className='text- text-green-900 font-bold'>Barangay Kagawad</span>
                        <p className='text-green-900'>Committee on Health</p>
                        <p className='text-green-900'>Committee on Tourism</p>
                        <p className='text-green-900'>Committee on Woman & Family</p>
                    </div>

                    <div>
                        <p className='font-semibold' >Hon.Marc Luiz Astrero De Jesus</p>
                        <span className='text- text-green-900 font-bold'>Sangguniang Kabataan Chairperson</span>
                        <p className='text-green-900'>Committee on Youth & Sports Development</p>
                        <p className='text-green-900'>Committee on Games & Amusement</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Casiano Gallardo Estella</p>
                        <span className='text- text-green-900 font-bold'>Barangay Treasurer</span>
                    </div>

                    <div>
                        <p className='font-semibold'>Bleassie Diwa Yumol</p>
                        <span className='text- text-green-900 font-bold'>Barangay Secretary</span>
                    </div>

                </aside>

                <main className='w-[800px] flex flex-col items-center relative'>
                    <h1 className='text-4xl mt-16 w-full text-center font-serif'>CERTIFICATE OF BUSINESS CLEARANCE</h1>

                    <div contenteditable="true" className='px-7 mt-20'>
                        <p className='mb-5'>TO WHOM IT MAY CONCERN:</p>

                        <p className='mb-5'>&nbsp; &nbsp; &nbsp; &nbsp; This is to certify that <span className='font-bold'>{requestDetails?.owner || '_________________'}</span>, is engaged in business as an operator of <span className='font-bold'>{requestDetails?.business || '_________________'}</span>, in this Barangay, with a nature of business as <span className='font-bold'>{requestDetails?.natureOfBusiness || '_________________'}</span>.</p>

                        <p className='mb-5'>The operator of <span className='font-bold'>{requestDetails?.business || '_________________'}</span> has no liabilities recorded in this reference as of this date.</p>
                    </div>


                    <div className='text-center absolute bottom-0'>
                        <p className='font-sans'>
                            <span className='font-bold text-sm'>SIGNED AND ISSUED on </span> 
                            <span className='underline'>{currentMonth} {currentDay}, {currentYear}</span>
                        </p>
                        <p className='text-sm'>at the Office of the Punong Barangay,</p>
                        <p className='text-sm'>Brgy.Balon Anito, Mariveles, Bataan</p>

                        <h1 className='underline font-semibold text-xl mt-7'>{punongBarangay?.fullname}</h1>
                        <p className='font-'>Punong Barangay</p>

                        <p className='text-xsm'>NOTE VALID WITHIN 90 DAYS UPON ISSUANCE. NOT VALID WITHOUT BARANGAY DRY SEAL</p>
                    </div>
                </main>
            </div>

            <footer className='flex flex-col justify-center items-center p-5 font-serif'>
                <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><FaLocationDot /></span>National Road , Barangay hall, Balon Anito, Mariveles, Bataan</p>

                <div className='flex flex-wrap gap-10 mt-3'>
                    <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><FaFacebookF /></span>Better Balon Anito</p>
                    <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><MdOutlineEmail /></span>betterbalonanito@gmail.com</p>
                    <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><FaPhoneAlt /></span>(047) 240-5500</p>
                </div>

                <p className='font-dancing text-2xl text-green-900 my-5'>Maayos na Serbisyo Publiko Susi sa Progresibong Balon Anito</p>
            </footer>
        </div>
    </section>
  )
}

export default CertificateOfBusinessClearance