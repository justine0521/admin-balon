import { useState, useEffect } from "react";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { format } from 'date-fns';

import '../App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RequestedCertificate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/certificates`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/certificates/${id}`);
      setData(data.filter(request => request._id !== id));
    } catch (error) {
      console.error("There was an error deleting the certificate:", error);
    }
  };

  const handleMarkAsComplete = async (request) => {
    try {
      // Send the request data to the completed database
      await axios.post(`${API_BASE_URL}/api/completed-certificates`, request);

      // Delete the request from the current database
      await axios.delete(`${API_BASE_URL}/api/certificates/${request._id}`);

      // Update the state to remove the marked request
      setData(data.filter(item => item._id !== request._id));
    } catch (error) {
      console.error("Error marking the certificate as complete:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/certificates/${id}/status`, { status: newStatus });

      setData(data.map(request => request._id === id ? { ...request, status: newStatus } : request));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / entriesPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="bg-red-100 text-red-600 border border-red-500 px-4 py-2 rounded-md">
        Error: {error.message}
      </p>
    );
  }

  return (
    <section className='w-4/5 h-screen mt-14 left-56 p-7 absolute hide-scrollbar'>
      <div className='bg-White'>
        <div className='flex justify-between items-center py-4 px-3 border-b-2'>
          <p className="text-2xl">Requested Certificates</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {paginatedData.map((request) => (
            <div key={request._id} className="bg-white shadow-md rounded-lg h-fit p-6 flex flex-col justify-between">
              <div className="flex justify-end">
                <button onClick={() => handleDelete(request._id)} className="text-2xl text-red-500">
                  <MdDelete />
                </button>
              </div>
              <div className="flex flex-col mb-4">
                <h2 className="text-xl font-semibold mb-2">{request.fullName}</h2>
                <p className="text-gray-600 mb-1"><strong>Tracking Code:</strong> {request.trackingCode}</p>
                <p className="text-gray-600 mb-1"><strong>Certificate:</strong> {request.certificateType}</p>
                <p className="text-gray-600 mb-1"><strong>Contact:</strong> {request.contactNumber}</p>
                <p className="text-gray-600 mb-1"><strong>Type:</strong> {request.selectType}</p>
                <p className="text-gray-600 mb-1"><strong>Payment:</strong> {request.paymentMethod}</p>
                <p className="text-gray-600 mb-1"><strong>Reference No:</strong> {request.referenceNo ? request.referenceNo : 'N/A'}</p>
                <p className="text-gray-600 mb-1"><strong>Requested at:</strong> {request.createdAt ? format(new Date(request.createdAt), 'Pp') : 'N/A'}</p>
                <p className="text-gray-600 mb-1"><strong>Pick up Date:</strong> {request.pickUpDate ? format(new Date(request.pickUpDate), 'P') : 'N/A'}</p>
                <p className="text-gray-600 mb-1"><strong>Purpose:</strong> {request.selectedPurpose}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <select
                  className="w-40 h-10 rounded-md outline-none border border-green-500"
                  value={request.status}  // Set the current value
                  onChange={(e) => handleStatusChange(request._id, e.target.value)}  // Handle the change
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Ready for Pickup">Out for Pickup</option>
                </select>
                <button
                  onClick={() => handleMarkAsComplete(request)}
                  className="bg-green-500 text-white px-2 py-2 rounded-md"
                >
                  Mark as Complete
                </button>
              </div>


            </div>
          ))}
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
    </section>
  );
}

export default RequestedCertificate;
