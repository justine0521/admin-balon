import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlotterModal from "../Modal/BlotterModal";
import '../App.css'

import { FaPlus, FaEdit, FaUserCheck } from "react-icons/fa";
import { RiCalendarScheduleLine, RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoDocumentSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

function Blotter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModal(false);

  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action) {
      case 'edit':
        navigate('/edit-form');
        break;
      case 'generate-report':
        navigate('/generate-form');
        break;
      case 'delete':
        setIsDeleteModal(true);
        break;
      default:
        break;
    }
    setDropdownIndex(null);
  };

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
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Settled" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Scheduled" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Scheduled" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Settled" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
    { complainant: "Test 1", respondent: "Test 2", victims: "Test 3", incident: "Incident", location: "House", date: "2023-03-14", time: "15:30:00", status: "Active" },
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
      case 'Active':
        return 'bg-red-200 text-red-800';
      case 'Settled':
        return 'bg-green-200 text-green-800';
      case 'Scheduled':
        return 'bg-blue-200 text-blue-800';
      default:
        return '';
    }
  };

  return (
    <section className='w-4/5 h-screen mt-14 left-56 p-7 absolute hide-scrollbar'>
      <div className='flex justify-end items-center'>
        <div className='flex gap-4'>
          <div className='bg-red-500 h-16 w-40 flex justify-evenly items-center text-White text-md rounded-md'>
            <AiOutlineClockCircle className='text-3xl' />
            <div className='flex flex-col items-center'>
              <p>Active Case</p>
              <p className='font-semibold text-xl'>0</p>
            </div>
          </div>
          <div className='bg-Green h-16 w-40 flex justify-evenly items-center text-White text-md rounded-md'>
            <FaUserCheck className='text-3xl' />
            <div className='flex flex-col items-center'>
              <p>Settled Case</p>
              <p className='font-semibold text-xl'>0</p>
            </div>
          </div>
          <div className='bg-Blue h-16 w-40 flex justify-evenly items-center text-White text-md rounded-md'>
            <RiCalendarScheduleLine className='text-3xl' />
            <div className='flex flex-col items-center'>
              <p>Schedule Case</p>
              <p className='font-semibold text-xl'>0</p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-White'>
        <div className='flex justify-between items-center py-4 px-3 mt-5 border-b-2'>
          <p className="text-2xl">Blotter</p>
          <button onClick={openModal} className='flex items-center gap-1 bg-Green hover:bg-green-500 text-White py-1 px-2 rounded-md'>
            <FaPlus /> Incident
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
          <table className='w-full'>
            <thead className='bg-Green'>
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Complainant</th>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Respondent</th>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Victim(s)</th>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Incident</th>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Location</th>
                <th className="px-14 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Date</th>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Time</th>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white divide-y divide-gray-300">
              {data.slice(startIndex, endIndex).map((resident, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className=" py-3">{resident.complainant}</td>
                  <td className="px-6 py-3">{resident.respondent}</td>
                  <td className="px-6 py-3">{resident.victims}</td>
                  <td className="px-6 py-3">{resident.incident}</td>
                  <td className="px-6 py-3">{resident.location}</td>
                  <td className="px-6 py-3">{resident.date}</td>
                  <td className="px-6 py-3">{resident.time}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatus(resident.status)}`}>
                      {resident.status}
                    </span>
                  </td>
                  <td className="relative">
                    <button onClick={() => setDropdownIndex(index === dropdownIndex ? null : index)} className='h-8 border px-3 bg-Green text-White border-Green rounded-md outline-none'>
                      <span className='flex items-center justify-center'>Action <RiArrowDownSLine /></span>
                    </button>
                    {dropdownIndex === index && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <button onClick={() => handleAction('edit')} title="Edit" className="flex items-center px-4 py-2 text-md text-Green hover:bg-gray-100 w-full">
                          <FaEdit className="mr-2"/> Edit
                        </button>
                        <button onClick={() => handleAction('generate-report')} title="Generate Report" className="flex items-center px-4 py-2 text-md text-Blue hover:bg-gray-100 w-full">
                          <IoDocumentSharp className="mr-2"/> Generate Report
                        </button>
                        <button onClick={handleDeleteButton} title="Delete" className="flex items-center px-4 py-2 text-md text-Red hover:bg-gray-100 w-full">
                          <MdDelete className="mr-2"/> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BlotterModal isOpen={isModalOpen} onClose={closeModal} />
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
            <IoWarningOutline className='text-6xl p-2 rounded-full bg-red-200 text-red-600 font-bold'/>
            <p className='text-center px-5'>This action cannot be undone. All information will be lost.</p>
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

export default Blotter;
