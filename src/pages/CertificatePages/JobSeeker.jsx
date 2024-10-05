import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import { FaFileAlt, FaRegEye } from "react-icons/fa";
import { IoMdDoneAll, IoIosArrowDropdown } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function JobSeeker() {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdown, setDropdown] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobSeeker`); 
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

  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const totalPages = Math.ceil(requests.length / entriesToShow);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? '' : parsedDate.toLocaleDateString(undefined, options);
  };

  const handleDropdown = async (action, requestId) => {
    switch (action) {
      case 'generate-Certificate':
        navigate(`/barangay-certificate-of-new-resident/${requestId}`);
        break;
      case 'View-Details':
        navigate(`/view-details-job-seeker/${requestId}`);
        break;
      case 'Completed':
          try {
              const completedRequest = requests.find(request => request._id === requestId);
              if (!completedRequest) {
                  throw new Error("Request not found.");
              }

              const requestData = {
                  ...completedRequest,
                  type: 'jobSeeker',
              };

              await axios.post(`${API_BASE_URL}/api/completed-certificates`, requestData);
              await axios.delete(`${API_BASE_URL}/api/jobSeeker/${requestId}`);

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
          await axios.delete(`${API_BASE_URL}/api/jobSeeker/${requestId}`);
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

  // Search filter function
  const filteredRequests = requests.filter((request) =>
    request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by fullName
  );

  const totalFilteredPages = Math.ceil(filteredRequests.length / entriesToShow);
  const currentFilteredRequests = filteredRequests.slice(startIndex, endIndex); // Slice filtered requests for pagination

  return (
    <div className="w-4/5 h-screen mt-14 left-56 p-7 absolute">
      <div className="bg-White">
        <div className="flex justify-between items-center h-16 bg-White px-5 w-full border border-b-gray-300">
          <p className='text-xl'>First Time Job Seeker Issuance</p>
          <div className='flex justify-center items-center gap-x-2'>
            <NavLink to={'/certificates'}>
              {({ isActive }) => (
                <p className={`${isActive ? 'text-gray-300' : 'text-Green'}`}>Certificates</p>
              )}
            </NavLink>
            /
            <NavLink to={'/job-seeker'}>
              {({ isActive }) => (
                <p className={`${isActive ? 'text-gray-300' : 'text-Green'}`}>First Time Job Seeker</p>
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

          <form>
            <label htmlFor="search">Search: </label>
            <input type="text" name="search" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-green" />
          </form>
        </div>

        <div className='overflow-x-auto'>
          <table className="w-full border-collapse">
            <thead className="bg-Green">
              <tr>
              <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300"></th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Name</th>

                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Birthday</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">age</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">gender</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">contact</th>


                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white divide-y divide-gray-300">
              {currentFilteredRequests.map((request, index) => (
                <tr key={request._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 text-sm">{request.fullName}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(request.birthday).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm">{request.age}</td>
                  <td className="px-6 py-4 text-sm">{request.gender}</td>
                  <td className="px-6 py-3 text-sm">{request.contactNumber}</td>
                  <td className='relative'>
                    <button onClick={() => toggleDropdown(index)} className='text-2xl bg-green-500 text-white rounded-full'>
                      <IoIosArrowDropdown />
                    </button>

                    {dropdown === index && (
                      <div className="absolute -top-4 right-10 mt-14 w-52 bg-white border border-gray-300 rounded-md shadow-lg z-10">
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
            disabled={currentPage === totalFilteredPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSeeker;
