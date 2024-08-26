import React from 'react'
import DonutChart from '../Charts/Chart';
import {NavLink} from 'react-router-dom'

// IMPORT ICONS
import { FaUsers, FaFingerprint } from 'react-icons/fa'
import { TbFingerprintOff } from "react-icons/tb";
import { GiHamburgerMenu, GiFemale } from "react-icons/gi";
import { MdMale } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import { BsStack, BsFillSignpostFill } from "react-icons/bs";

function Home() {
  return (
    <section className="w-4/5 h-full mt-14 left-56 p-7 absolute">
        <p className='font-semibold text-3xl w-fit'>Dashboard</p>

        <div className='flex items-center flex-wrap justify-center gap-5 mt-7'>
            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md'>
                <FaUsers className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>POPULATION</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>
            

            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <MdMale className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>MALE</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>

            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <GiFemale className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>FEMALE</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>
        </div>

        <div className='flex items-center flex-wrap justify-center gap-5 mt-7'>
            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <FaFingerprint className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>VOTERS</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>

            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <TbFingerprintOff className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>NON VOTERS</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>

            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <GiHamburgerMenu className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>PRECINCT</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>
        </div>

        <div className='flex items-center flex-wrap justify-center gap-5 mt-7'>
            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <BsFillSignpostFill className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>STREET</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>

            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <BsStack className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>BLOTTER</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>

            <div className='bg-Green text-White w-64 h-36 flex items-center justify-evenly rounded-md '>
                <TbCurrencyPeso className='text-6xl' />

                <div className='text'>
                    <p className='font-semibold text-lg'>REVENUE</p>

                    <p className='font-semibold text-xl'>0</p>
                </div>
            </div>

        </div>

    </section>
  )
}

export default Home