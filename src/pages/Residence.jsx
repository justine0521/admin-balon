import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ResidenceModal from '../Modal/ResidenceModal';
import EditResidence from '../Modal/EditResidenceModal';
import '../App.css';

import { FaPlus, FaEdit, FaFileExport, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { BsPersonFillSlash } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";


function Residence() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editResidenceModal, setEditResidenceModal] = useState(false);
  const [deleteModal, setIsDeleteModal] = useState(false);
  const [blockModal, setIsBlockModal] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);

  const handleAddResident = (newResident) => {
    setResidents([...residents, newResident]);
    setIsModalOpen(false);
  };

  // const handleDelete = () => {
  //   const updatedList = residents.filter((resident) => resident.id !== selectedResident.id);
  //   setResidents(updatedList);
  //   setIsDeleteModal(false); // Close the delete modal after deletion
  // };

  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action) {
      case 'edit':
        setEditResidenceModal(true);
        break;
      case 'viewDetails':
        navigate('/view-resident-profile');
        break;
      case 'delete':
        setIsDeleteModal(true);
        break;
      case 'block':
        setIsBlockModal(true);
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

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const totalPages = Math.ceil(residents.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  return (
    <section className="w-4/5 h-screen mt-14 left-56 p-7 absolute hide-scrollbar">
      <div className="bg-White">
        <div className="flex justify-between items-center h-16 px-5 w-full border-b-2 border-gray-400">
          <p className="text-2xl">Residence Record</p>

          <div className='flex items-center gap-x-5'>
            <button onClick={() => setIsModalOpen(true)} className="flex justify-center items-center gap-x-1 bg-Green text-white rounded-md px-3 py-1 hover:bg-green-500">
              <FaPlus /> Resident
            </button>
            <button className="flex justify-center items-center gap-x-1 bg-Blue text-white rounded-md px-3 py-1 hover:bg-blue-500">
              <FaFileExport /> Export
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center my-5 px-5">
          <div className="flex items-center gap-x-2">
            <label htmlFor="entries">Show Entries:</label>
            <select id="entries" value={entriesToShow} onChange={handleEntriesChange} className="border border-gray-300 rounded-md px-3 py-1">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <form className="flex justify-end items-center gap-x-2">
            <label htmlFor="search">Search:</label>
            <input type="text" name="search" id="search" className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-Green" />
          </form>
        </div>

        <div className='overflow-x-auto'>
          <table className="w-full h-full border-collapse">
            <thead className="bg-Green">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Picture</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">ID</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">First Name</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Middle Name</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Last Name</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Gender</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Age</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Voter Status</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white divide-y divide-gray-300">
              {residents.slice(startIndex, endIndex).map((resident, index) => (
                <tr key={resident.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 flex justify-center items-center">
                    <img src={resident.imageUrl || "https://via.placeholder.com/50"} alt="Profile" className="w-10 h-10 rounded-full" />
                  </td>
                  <td id={resident.id} className="px-6 py-3">{resident.id}</td>
                  <td id={resident.id} className="px-6 py-3">{resident.fName}</td>
                  <td id={resident.id} className="px-6 py-3">{resident.mName}</td>
                  <td id={resident.id} className="px-6 py-3">{resident.lName}</td>
                  <td id={resident.id} className="px-6 py-3">{resident.gender}</td>
                  <td id={resident.id} className="px-6 py-3">{resident.age}</td>
                  <td id={resident.id} className="px-6 py-3">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${resident.voterStatus === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {resident.voterStatus}
                    </span>
                  </td>
                  <td className="relative">
                    <button onClick={() => setDropdownIndex(index === dropdownIndex ? null : index)} className='h-8 border px-3 bg-Green text-White border-Green rounded-md outline-none'>
                      <span className='flex items-center justify-center'>Action <RiArrowDownSLine /></span>
                    </button>
                    {dropdownIndex === index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <button onClick={() => handleAction('edit')} className="flex items-center px-4 py-2 text-md text-Green hover:bg-gray-100 w-full">
                          <FaEdit className="mr-2" /> Edit
                        </button>
                        <button onClick={() => handleAction('viewDetails')} className="flex items-center px-4 py-2 text-md text-Blue hover:bg-gray-100 w-full">
                          <FaEye className="mr-2" /> View Details
                        </button>
                        <button onClick={() => handleAction('delete')} className="flex items-center px-4 py-2 text-md text-Red hover:bg-gray-100 w-full">
                          <MdDelete className="mr-2" /> Delete
                        </button>
                        <button onClick={() => handleAction('block')} className="flex items-center px-4 py-2 text-md text-Yellow hover:bg-gray-100 w-full">
                          <BsPersonFillSlash className="mr-2" /> Block
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
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <ResidenceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddResident={handleAddResident} />
        {editResidenceModal && <EditResidence isOpen={editResidenceModal} onClose={() => setEditResidenceModal(false)} />}
      </div>

      {/* This is Modal for Delete Button in Action */}
      {deleteModal &&
        <div className='fixed top-0 left-0 m-0 h-full w-full flex justify-center items-center z-50'>
          <div className='bg-white w-96 h-72 rounded-xl shadow-xl drop-shadow-xl flex flex-col justify-center items-center gap-y-5'>
            <IoWarningOutline className='text-6xl p-2 rounded-full bg-red-200 text-red-600 font-bold' />
            <p className='text-center px-5'>This action cannot be undone. All information of this person will be lost.</p>
            <div className='w-full px-5 flex flex-col gap-y-3'>
              <button className='bg-Red text-White w-full p-1 rounded-md font-semibold'>Delete</button>
              <button onClick={() => setIsDeleteModal(false)} className='text-black w-full p-1 rounded-md border border-gray-300 font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      }

      {/* This is Modal for Block Button in Action */}
      {blockModal &&
        <div className='fixed top-0 left-0 m-0 h-full w-full flex justify-center items-center z-50'>
          <div className='bg-white w-96 h-72 rounded-xl shadow-xl drop-shadow-xl flex flex-col justify-center items-center gap-y-5'>
            <ImBlocked className='text-6xl p-2 rounded-full bg-red-200 text-black font-bold' />
            <p className='text-center px-5'>Are you sure you want to <strong>Block</strong> this person?</p>
            <div className='w-full px-5 flex flex-col gap-y-3'>
              <button className='bg-black text-White w-full p-1 rounded-md font-semibold'>Block</button>
              <button onClick={() => setIsBlockModal(false)} className='text-black w-full p-1 rounded-md border border-gray-300 font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      }


    </section>
  );
}

export default Residence;
