// Sidebar.jsx

import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../images/Logo.png';
import LogoContext from '../pages/LogoContext'

// IMPORT ICONS
import { FaUsers, FaBookDead, FaCertificate, FaUser, FaFile, FaBell } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi2";
import { RiStackFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { MdAnnouncement } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsClockHistory, BsPersonFillSlash } from "react-icons/bs";

function Sidebar() {
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const { imageUrl } = useContext(LogoContext);
    const navigate = useNavigate();

    const toggleAside = () => {
        setIsAsideOpen(!isAsideOpen);
    };

    return (
        <section>
            <aside className={`bg-White w-56 h-screen fixed left-0 top-0 z-40 ${!isAsideOpen && 'hidden'} flex flex-col`}>
                <div className='w-full h-52 flex flex-col justify-center items-center border-b-2'>
                    <img src={imageUrl} alt="Logo" className='h-36  rounded-full ' />
                </div>

                <div className="flex-1 overflow-y-auto">
                    <ul className="py-4">
                        <NavLink to={'/'}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <MdDashboard className='mr-3' />
                                        Dashboard
                                    </div>
                                </li>
                            )}
                        </NavLink>

                        <NavLink to={"/residence-Record"}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <FaUsers className='mr-3' />
                                        Residence Record
                                    </div>
                                </li>
                            )}
                        </NavLink>

                        <NavLink to={"/certificates"}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <FaCertificate className='mr-3' />
                                        Certificates
                                    </div>
                                </li>
                            )}
                        </NavLink>

                        <NavLink to={"officials-and-staff"}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <HiUsers className='mr-3' />
                                        Officials and Staff
                                    </div>
                                </li>
                            )}
                        </NavLink>


                        <NavLink to={"requested-certificate"}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <FaFile className='mr-3' />
                                        <p className='text-sm'>Requested Certificate</p>
                                    </div>
                                </li>
                            )}
                        </NavLink>

                        <NavLink to={"announcement"}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <MdAnnouncement className='mr-3' />
                                        News and Updates
                                    </div>
                                </li>
                            )}
                        </NavLink>

                        <NavLink to={"blocklisted"}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <BsPersonFillSlash className='mr-3' />
                                        Block Listed
                                    </div>
                                </li>
                            )}
                        </NavLink>

                        <NavLink to={"transactions"}>
                            {({ isActive }) => (
                                <li className={`${isActive ? 'bg-Green text-white' : 'hover:text-Green'} px-4 py-2 mx-2 text-black rounded-lg transition duration-500`}>
                                    <div className='flex items-center'>
                                        <BsClockHistory className='mr-3' />
                                        Transaction History
                                    </div>
                                </li>
                            )}
                        </NavLink>
                    </ul>
                </div>
            </aside>
        </section>
    );
}

export default Sidebar;
