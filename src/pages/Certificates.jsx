import { useState } from 'react';
import { NavLink } from 'react-router-dom'

import '../App.css'


function Certificates() {

  return (
    <section className="w-4/5 h-screen mt-14 left-56 p-7 absolute hide-scrollbar">

      <div>
        <div className="flex justify-between items-center h-16 bg-gray-100 px-5 w-full border-b-2 border-black rounded-t-xl ">
          <p className='text-2xl'>Residence Certificate Issuance</p>

          {/* <form action="" className="flex justify-end items-center gap-x-2 my-5">
            <label htmlFor="search">Search:</label>

            <input type="text" name="search" id="search" className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-Green"/>
          </form> */}
        </div>

        <div className='py-5 flex justify-evenly items-center gap-y-5 flex-wrap'>

          {/* This is for barangay Clearance */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Barangay Clearance
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                This is a general clearance that verifies the person has no pending cases or derogatory records in the barangay.
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/barangay-clearance'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for Certificate of Residency */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Certificate of Residency
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                This certifies that a person is a resident of the barangay.
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/certificate-of-residency'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for Certificate of Indigency */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Certificate of Indigency
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                This certifies that the person or family belongs to the indigent sector of the community.
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/certificate-of-indigency'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for Certificate of Common Law */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Common Law
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, velit?
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/common-law'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for Certificate of Business Clearance */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Business Clearance
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                This is issued to business owners within the barangay and is a requirement for obtaining a business permit from the municipal or city hall.
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/business-clearance'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for Travel Permit */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Travel Permit
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, eveniet?
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/travel-permit'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for Certificate of Good Moral Character */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Guardianship
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum similique asperiores reprehenderit quis quisquam quidem laborum nobis
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/guardianship'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for First Time Job Seeker */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                First Time Job Seeker
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, eos!
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/job-seeker'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>

          {/* This is for Certificate for Solo Parents */}
          <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="p-5">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-Green antialiased">
                Certificate for Solo Parents
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                This certifies that the person is a solo parent as defined by law.
              </p>
            </div>

            <div class="p-5 pt-0">
              <NavLink to={'/certificate-for-solo-parent'}>
                <button data-ripple-light="true" type="button" class="select-none rounded-lg bg-Green py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  Issue
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates