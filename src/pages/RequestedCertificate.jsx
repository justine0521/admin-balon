import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlotterModal from "../Modal/BlotterModal";
import '../App.css'

import { FaPlus, FaEdit, FaFile } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoDocumentSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

function RequestedCertificate() {

  const [deleteModal, setIsDeleteModal] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const closeDeleteModal = () => setIsDeleteModal(false);

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleDeleteButton = (event) => {
    event.preventDefault();
    setIsDeleteModal(true);
    setDropdownIndex(null);
  };

  const data = [
    { number: '1', certificate: 'BARANGAY CLEARANCE', tracking: '0348-5189-2629-2264', name: 'justine santos', contact: '09619771972', type: 'For Pickup', payment: 'G-Cash', reference: '192314124143234', purpose: 'Para po sa Scholar', pickupDate: '09-14-2024', dateRequested: '03-05-2024', status: 'Ready-to-Pickup' },
    { number: '2', certificate: 'BARANGAY CLEARANCE', tracking: '0348-5189-2629-5343', name: 'justine basibas', contact: '09123456789', type: 'For Pickup', payment: 'G-Cash', reference: '255812938219122', purpose: 'Para sa Work', pickupDate: '09-14-2024', dateRequested: '03-05-2024', status: 'Ready-to-Pickup' },
  ];

  const totalPages = Math.ceil(data.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  function getStatus(status) {
    switch (status) {
      case 'Pending':
        return 'text-red-800';
      case 'Released':
        return 'text-green-800';
      case 'Ready-to-Pickup':
        return 'text-blue-800';
      case 'Processing':
        return 'text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <section className='w-4/5 h-screen mt-14 left-56 p-7 absolute hide-scrollbar'>

      <div className='bg-White'>
        <div className='flex justify-between items-center py-4 px-3 border-b-2'>
          <p className="text-2xl">Requested Certificates</p>
          <button className='flex items-center gap-1 bg-Green hover:bg-green-500 text-White py-1 px-2 rounded-md'>
            <FaFile /> Documents
          </button>
        </div>

        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-x-2">
            <label htmlFor="entries">Show Entries:</label>
            <select name="entries" id="entries" className="border border-gray-300 p-1 px-3 rounded-md" onChange={handleEntriesChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <form action="">
            <label>Search: </label>
            <input type="text" name='search' id='search' className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-Green" />
          </form>
        </div>

        <div className="overflow-x-auto">
          <table class="w-full">
            <thead class="hidden">
              <tr>
                <th class="px-6 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">No.</th>
                <th class="px-6 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Certificate</th>
                <th class="px-20 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Tracking Number</th>
                <th class="px-20 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Name</th>
                <th class="py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Contact Number</th>
                <th class="py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Type</th>
                <th class="px-14 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Pickup Date</th>
                <th class="px-6 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Payment Method</th>
                <th class="px-6 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Reference No.</th>
                <th class="px-20 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Purpose</th>
                <th class="px-14 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Date Requested</th>
                <th class="px-14 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Status</th>
                <th class="px-6 py-4 text-xs font-medium text-white uppercase tracking-wider border-l border-r border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-300">
              {data.slice(startIndex, endIndex).map((resident, index) => (
                <tr key={index} class="mb-4 bg-White">
                  <td class="flex justify-end items-center text-right px-6 py-1 relative mt-4 w-full border" data-label="No.">
                    <span class="absolute left-0 pl-4 font-semibold text-md">No.</span>{resident.number}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Certificate">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Certificate</span>
                    <span className="font-semibold">{resident.certificate}</span>
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Tracking Number">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Tracking Number</span>{resident.tracking}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Name">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Name</span>{resident.name}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Contact Number">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Contact Number</span>{resident.contact}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Type">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Type</span>{resident.type}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Pickup Date">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Pickup Date</span>{resident.pickupDate}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Payment Method">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Payment Method</span>{resident.payment}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Reference No.">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Reference No.</span>{resident.reference}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Date Requested">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Date Requested</span>{resident.dateRequested}
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border overflow-hidden">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Purpose</span>
                    <span class="ml-16">{resident.purpose}</span>
                  </td>
                  <td class="flex justify-end items-center text-right px-6 py-1 relative w-full border" data-label="Status">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Status</span>
                    <select class="ml-4 w-40 h-8 rounded-md outline-none border border-green-500">
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Released">Out for Deliver</option>
                      <option value="For Pickup">Out for Pickup</option>
                    </select>
                  </td>
                  <td class="flex justify-end items-center px-6 h-14 relative w-full border" data-label="Action">
                    <span class="absolute left-0 pl-4 font-semibold text-md">Action</span>
                    <button onClick={handleDeleteButton} title="Delete" class="text-2xl text-red-500">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center p-5">
        <button
          onClick={handlePreviousPage}
          className={`p-2 border border-Green rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          className={`p-2 border border-Green rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {deleteModal &&
        <div className='fixed top-0 left-0 m-0 h-full w-full flex justify-center items-center z-50'>
          <div className='bg-white w-96 h-72 rounded-xl shadow-xl drop-shadow-xl flex flex-col justify-center items-center gap-y-5'>
            <IoWarningOutline className='text-6xl p-2 rounded-full bg-red-200 text-red-600 font-bold' />
            <p className='text-center px-5'>This action cannot be undone. Are you sure you want to Delete?</p>
            <div className='w-full px-5 flex flex-col gap-y-3'>
              <button className='bg-Red text-White w-full p-1 rounded-md font-semibold'>Delete</button>
              <button onClick={closeDeleteModal} className='text-black w-full p-1 rounded-md border border-gray-300 font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      }
    </section>
  );
}

export default RequestedCertificate