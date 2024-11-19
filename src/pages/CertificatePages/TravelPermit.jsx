import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FaFileAlt, FaRegEye } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoMdDoneAll, IoIosArrowDropdown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TravelPermit({ setActiveCertificate }) {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdown, setDropdown] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/travelPermit`); 
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // const filteredRequests = requests.filter(request =>
  //   request.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const totalPages = Math.ceil(requests.length / entriesToShow);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDropdown = async (action, requestId) => {
    switch (action) {
      case 'generate-Certificate':
        navigate(`/barangay-travel-permit-certificate/${requestId}`);
        break;
      case 'View-Details':
        navigate(`/view-details-travel-permit/${requestId}`);
        break;
      case 'Completed':
          try {
              const completedRequest = requests.find(request => request._id === requestId);
              if (!completedRequest) {
                  throw new Error("Request not found.");
              }

              const requestData = {
                  ...completedRequest,
                  type: 'travelPermit',
              };

              await axios.post(`${API_BASE_URL}/api/completed-certificates`, requestData);
              await axios.delete(`${API_BASE_URL}/api/travelPermit/${requestId}`);

              setRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));

              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Request marked as completed!",
                  showConfirmButton: false,
                  timer: 1500
              });
          } catch (error) {
              console.error('Error completing request:', error.response ? error.response.data : error.message);
              Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Failed to mark as completed",
                  showConfirmButton: false,
                  timer: 1500
              });
          }
          break;
      case 'Delete':
        try {
          await axios.delete(`${API_BASE_URL}/api/travelPermit/${requestId}`);
          setRequests(requests.filter(request => request._id !== requestId));

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error) {
          console.error('Error deleting request:', error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to Delete",
            showConfirmButton: false,
            timer: 1500
          });
        }
        break;
      default:
        break;
    }
    setDropdown(null);
  };
  
  const toggleDropdown = (index) => {
    setDropdown(dropdown === index ? null : index); 
  };

  const filteredRequests = requests.filter((request) =>
    request.owner.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by fullName
  );

  const totalFilteredPages = Math.ceil(filteredRequests.length / entriesToShow);
  const currentFilteredRequests = filteredRequests.slice(startIndex, endIndex); // Slice filtered requests for pagination

  return (
    <div className="">
      <div className="text-sm">
        <div className="flex justify-between items-center h-14 w-full border-b-2 border-b-gray-400">
          <p className='text-xl'>Travel Permit Issuance</p>
          
          <div className='flex justify-center items-center gap-x-2 text-sm'>
            <button onClick={() => setActiveCertificate(null)} className="text-green-600 hover:underline">
              Certificates
            </button>
            /
            <p className='text-gray-400 cursor-pointer'>Travel Permit</p>
          </div>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-x-2">
            <label htmlFor="entries">Show Entries:</label>
            <select id="entries" value={entriesToShow} onChange={handleEntriesChange} className="border border-gray-300 rounded-md px-3 py-1">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <form>
            <label htmlFor="search">Search: </label>
            <input type="text" name="search" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-green" />
          </form>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-5 text-gray-500">No one to issue Travel Permit</div>
        ) : (
          <div>
            <table className="w-full border-collapse">
              <thead className="bg-Green">
                <tr>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300"></th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">May Ari</th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Uri ng Sasakyan</th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Plate Number</th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Driver</th>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="text-center divide-y divide-gray-300">
                {currentFilteredRequests.map((request, index) => (
                  <tr key={request._id} className="hover:bg-white">
                    <td className="py-4 text-sm text-gray-700">{startIndex + index + 1}</td>
                    <td className="py-4 text-sm">{request.owner}</td>
                    <td className="py-3 text-sm">{request.typeOfCar}</td>
                    <td className="py-3 text-sm">{request.plateNumber}</td>
                    <td className="py-3 text-sm">{request.driver}</td>
                    <td className='relative'>
                      <button onClick={() => toggleDropdown(index)} className='text-xl   rounded-full'>
                        {dropdown === index ? <FaAngleUp /> : <FaAngleDown />}
                      </button>

                      {dropdown === index && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          <button onClick={() => handleDropdown('generate-Certificate', request._id)} className="flex items-center gap-3 px-4 py-2 text-md text-Blue hover:bg-gray-100 w-full">
                            <FaFileAlt /> Generate Certificate
                          </button>
                          <button onClick={() => handleDropdown('View-Details', request._id)} className="flex items-center gap-3 px-4 py-2 text-md text-yellow-500 hover:bg-gray-100 w-full">
                            <FaRegEye /> View Details
                          </button>
                          <button onClick={() => handleDropdown('Completed', request._id)} className="flex items-center gap-3 px-4 py-2 text-md text-Green hover:bg-gray-100 w-full">
                            <IoMdDoneAll /> Completed
                          </button>
                          <button onClick={() => handleDropdown('Delete', request._id)} className="flex items-center gap-3 px-4 py-2 text-md text-Red hover:bg-gray-100 w-full">
                            <MdDeleteOutline /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

            {totalFilteredPages > 1 && (
              <div className="flex justify-between items-center p-5">
                <button onClick={handlePreviousPage} className={`p-2 border border-Green rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`} disabled={currentPage === 1}>
                  Previous
                </button>

                <span className='text-sm'>Page {currentPage} of {totalPages}</span>

                <button onClick={handleNextPage} className={`p-2 border border-Green rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
      </div>
    </div>
  );
}

export default TravelPermit;
