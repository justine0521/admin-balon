import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FaFileAlt } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CertificateIndigency() {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/certificates?certId=3`); // Update with the correct certId for Certificate of Indigency
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(requests.length / entriesToShow);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-4/5 h-screen mt-14 left-56 p-7 absolute">
      <div className="bg-White">
        <div className="flex justify-between items-center h-16 bg-White px-5 w-full border border-b-gray-300">
          <p className='text-xl'>Certificate of Indigency Issuance</p>
          <div className='flex justify-center items-center gap-x-2'>
            <NavLink to={'/certificates'}>
              {({ isActive }) => (
                <p className={`${isActive ? 'text-gray-300' : 'text-Green'}`}>Certificates</p>
              )}
            </NavLink>
            /
            <NavLink to={'/certificate-of-indigency'}>
              {({ isActive }) => (
                <p className={`${isActive ? 'text-gray-300' : 'text-Green'}`}>Certificate of Indigency</p>
              )}
            </NavLink>
          </div>
        </div>

        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-x-2">
            <label htmlFor="entries">Show Entries:</label>
            <select id="entries" value={entriesToShow} onChange={handleEntriesChange} className="border border-gray-300 rounded-md px-3 py-1">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <form action="">
            <label htmlFor="search">Search: </label>
            <input type="text" name="search" id="search" className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-Green" />
          </form>
        </div>

        <div className='overflow-x-auto'>
          <table className="w-full border-collapse">
            <thead className="bg-Green">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Full Name</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Contact Number</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Tracking Code</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white divide-y divide-gray-300">
              {requests.slice(startIndex, endIndex).map((request) => (
                <tr key={request._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{request.fullName}</td>
                  <td className="px-6 py-3">{request.contactNumber}</td>
                  <td className="px-6 py-3">{request.selectType}</td>
                  <td className="px-6 py-3">{request.trackingCode}</td>
                  <td>
                    <NavLink to={`/generate-indigency-certificate/${request._id}`}>
                      <button title='Generate Certificate'>
                        <FaFileAlt className='text-Blue' />
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </div>
  );
}

export default CertificateIndigency;
