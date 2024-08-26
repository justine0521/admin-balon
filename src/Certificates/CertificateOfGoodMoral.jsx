import React, {useContext} from 'react'
import Logo from '../images/Logo.png'
import { NavLink } from 'react-router-dom'
import './Certificates.css'
import LogoContext from '../pages/LogoContext'

import { IoMdSkipBackward } from "react-icons/io";
import { FaPrint } from "react-icons/fa";

function CertificateOfGoodMoral() {
    const { imageUrl } = useContext(LogoContext);

    const handlePrint = () => {
        window.print();
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentDay = currentDate.getDate()
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ]
    const currentMonth = monthNames[currentDate.getMonth()]

  return (
    <div className='bg-gray-300 fixed top-0 left-0 w-full h-screen z-50 overflow-auto no-scrollbar'>

        <div className="header-container">
            <header className="flex justify-end items-center gap-x-5 h-16 px-5 w-full">

                <button onClick={handlePrint} className='flex items-center gap-x-2 border border-Blue text-Blue rounded-full py-1 px-3 transition-all ease-in duration-400 hover:bg-Blue hover:text-White'>
                    <FaPrint /> Print Certificate
                </button>

                <NavLink to={'/certificate-of-good-moral-character'}>
                <button className='flex items-center gap-x-2 border border-red-400 p-1 px-2 transition-all ease-in duration-400 rounded-full text-Red hover:bg-red-500 hover:text-White'>
                    <IoMdSkipBackward /> Back
                    </button>
                </NavLink>

            </header>

        </div>

        <div className='flex justify-center'>
            <div className='bg-white h-fit w-full p-7'>
                <div className='h-full border-8 border-transparent relative '>
                    <img src={imageUrl} alt="" className='h-32 absolute top-4 left-0'/>

                    <div className='text-center font-serif mt-10 px-20'>
                        <p className='text-gray-500'>Republic of the Philippines</p>
                        <p className='text-gray-500'>Province of Bataan</p>
                        <p className='text-gray-500'>Municipality of Mariveles</p>

                        <p className='text-4xl mt-3 text-Green'>Barangay Balon Anito</p>

                        <hr class="w-full border-b border-black mt-3 my-1" />
                        <hr class="w-full border-b border-black" />
                    
                    </div>

                    <div className='mt-10'>
                        <div className='text-center font-serif flex flex-col gap-y-5'>
                            <p className='text-lg'>OFFICE OF THE BARANGAY CAPTAIN</p>

                            <p className='text-3xl'>CERTIFICATE OF GOOD MORAL</p>
                        </div>

                        <div className='font-serif px-7'>
                            <div className='my-10'>
                                <p>TO WHOM IT MAY CONCERN:</p>
                            </div>

                            <div className='text-gray-500'>
                                <p>This is to certify that________________________________________, _______years old,
                                single, and resident of Barangay Balon Anito, Mariveles, Bataan, is known to be a person of good moral character, law abiding citizen of the community and as far as record of this office is concerned, he/she has never been charged nor convicted of any crime and whatsoever.
                                
                                <br />
                                <br />
                                
                                <p>This CERTIFICATION is being issued upon the request of the above named person for whatever legal purpose it may serve.</p>

                                <br />

                                <span className='font-semibold text-black'>ISSUED </span> this <span className="font-bold text-black">{currentDay}</span> day of <span className="font-bold text-black"> {currentMonth}</span>, {currentYear} at Barangay Balon Anito, Mariveles, Bataan.

                                </p>
                            </div>

                            <div className='flex flex-col justify-end items-end mt-16 text-center'>
                                <p className='text-center'>JUSTINE R. SANTOS</p>
                                <p className='text-center text-gray-500'>Barangay Captain</p>
                            </div>

                            <div className='mt-4 mb-16 text-gray-500 invisible'>
                                <p>O.R No. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    _________________</p>
                                <p>Date Issued: &nbsp; _________________</p>
                                <p>Doc. Stamp: &nbsp; _________________</p> 
                            </div>
                        </div>          
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CertificateOfGoodMoral