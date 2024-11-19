import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultProfile from '../images/defaultProfile.png';
import MarivelesLogo from '../images/Mariveles-Logo.png';
import BarangayLogo from '../images/Logo.png';
import { useNavigate } from 'react-router-dom';

import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function BarangayClearanceDetails() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResidentDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/barangayClearance?id=${id}`);
        if (response.data.length > 0) {
          setResident(response.data[0]);
        } else {
          setError('Resident not found.');
        }
      } catch (error) {
        console.error('Error fetching resident details:', error);
        setError('Failed to fetch resident details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResidentDetails();
    } else {
      setError('No resident ID provided.');
      setLoading(false);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <p>Loading resident details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <section className='bg-white fixed top-0 left-0 w-full h-screen z-50 overflow-auto no-scrollbar p-5'>
      <div className='header-container'>
        <header className='bg-white flex justify-between items-center py-3 px-3 border-b-2'>
          <p className='text-xl '>Resident Profile</p>
          <div className='flex gap-x-5'>
            <button onClick={handlePrint} className='border border-blue-500 text-blue-500 rounded-full py-1 px-3 transition-all ease-in duration-400 hover:bg-blue-500 hover:text-white'>
              Print Report
            </button>

            <button onClick={() => navigate(-1)} className='border border-red-500 text-red-500 rounded-full py-1 px-3 transition-all ease-in duration-400 hover:bg-red-500 hover:text-white'>
              Back
            </button>
          </div>
        </header>
      </div>

      <header className='h-fit p-3 flex justify-evenly items-center border-b-2 border-black opacity-80'>
        <img src={MarivelesLogo} alt="Mariveles Logo" className='h-32 w-32' />

        <div className='text-center'>
          <p className='text-sm'>Republic of the Philippines</p>
          <p className='text-sm'>Province of Bataan</p>
          <p className='text-sm'>Municipality of Mariveles</p>

          <h1 className='font-bold font-sans text-xl'>BARANGAY BALON ANITO</h1>
          <h1 className='text-3xl text-green-900 font-dancing'>Office of the Punong Barangay</h1>
          <p className='text-xl mt-5 font-semibold'>Resident Profile</p>
        </div>

        <img src={BarangayLogo} alt="Barangay Logo" className='h-32 w-32' />
      </header>

      <div className="bg-white p-5 flex flex-col  md:flex-row items-start gap-8">
        <img src={DefaultProfile} alt="Profile" className="w-32 h-32 md:w-40 md:h-40  object-cover shadow-lg border-2 border-gray-300" />

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Resident Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <p className="text-gray-700"><span className="font-semibold">Name:</span> {resident.fullName}</p>
            <p className="text-gray-700"><span className="font-semibold">Address:</span> {resident.address}</p>
            <p className="text-gray-700"><span className="font-semibold">Gender:</span> {resident.gender}</p>
            <p className="text-gray-700"><span className="font-semibold">Age:</span> {resident.age}</p>
            <p className="text-gray-700"><span className="font-semibold">Birthday:</span> {new Date(resident.birthday).toLocaleDateString()}</p>
            <p className="text-gray-700"><span className="font-semibold">Birth Place:</span> {resident.birthPlace}</p>
            <p className="text-gray-700"><span className="font-semibold">Civil Status:</span> {resident.civilStatus}</p>
            <p className="text-gray-700"><span className="font-semibold">Blood Type:</span> {resident.bloodType}</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> {resident.email}</p>
            <p className="text-gray-700"><span className="font-semibold">Purpose:</span> {resident.purpose}</p>
          </div>
        </div>
      </div>

      <footer className='flex flex-col justify-center items-center p-5 mt-5 font-serif border-t-2 border-black'>
        <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><FaLocationDot /></span>National Road , Barangay hall, Balon Anito, Mariveles, Bataan</p>

        <div className='flex flex-wrap gap-10 mt-3'>
          <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><FaFacebookF /></span>Better Balon Anito</p>
          <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><MdOutlineEmail /></span>betterbalonanito@gmail.com</p>
          <p className='flex items-center gap-2'><span className='p-1 icons bg-blue-600 rounded-full text-white'><FaPhoneAlt /></span>(047) 240-5500</p>
        </div>

        <p className='font-dancing text-2xl text-green-900 my-5'>Maayos na Serbisyo Publiko Susi sa Progresibong Balon Anito</p>
      </footer>

    </section>
  );
}

export default BarangayClearanceDetails;
