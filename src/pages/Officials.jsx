import { useState } from "react";
import OfficialsModal from "../Modal/OfficialsModal";
import '../App.css'

import { FaPlus, FaEdit, FaFileExport } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

function Officials() {
  const [isModalOpen, setIsModalOpen] = useState();
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // This Modal is for Delete Button
  const [deleteModal, setIsdeleteModal] = useState(false);
  function closeDeleteModal() {
    setIsdeleteModal(false);
  }

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  }

  const officials = [

    { name: "Justine Ribano Santos", position: "Barangay Captain", dateAdded: "2023-03-14", status: "Active" },
    { name: "Justine Ordonio Basibas", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Rency Celestino Delos Santos", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Angelica Pyee Agaton Arquiza", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Ronel Navarro Magcalas", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "CJ Almazan Ocampo", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Jim Ver Pol Dimaano", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Charls Paglinawan Pakingking", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Justine Ordonio Basibas", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Rency Celestino Delos Santos", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Angelica Pyee Agaton Arquiza", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Ronel Navarro Magcalas", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "CJ Almazan Ocampo", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Jim Ver Pol Dimaano", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Charls Paglinawan Pakingking", position: "Barangay Kagawad", dateAdded: "2023-03-14", status: "Active" },
    { name: "Justine Ribano Santos", position: "Barangay Captain", dateAdded: "2023-03-14", status: "Active" },
    { name: "Justine Ribano Santos", position: "Barangay Captain", dateAdded: "2023-03-14", status: "Active" },
    { name: "Justine Ribano Santos", position: "Barangay Captain", dateAdded: "2023-03-14", status: "Active" },
    { name: "Justine Ribano Santos", position: "Barangay Captain", dateAdded: "2023-03-14", status: "Active" },
    { name: "Justine Ribano Santos", position: "Barangay Captain", dateAdded: "2023-03-14", status: "Active" },
  ];

  const totalPages = Math.ceil(officials.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="w-4/5 h-full mt-14 left-56 p-7 absolute hide-scrollbar">

      <div className="bg-White">
        <div className="flex justify-between items-center h-16 bg-White px-5 w-full border-b-2 border-gray-400">
          <p className="text-2xl">Barangay Officials</p>

          <div className="flex items-center gap-5">
            <button onClick={openModal} className="flex justify-center items-center gap-x-1 bg-Green text-white rounded-md px-3 py-1 hover:bg-green-500"><FaPlus /> Official </button>
            <button className="flex justify-center items-center gap-x-1 bg-Blue text-white rounded-md px-3 py-1 hover:bg-blue-500"><FaFileExport /> Export</button>
          </div>
        </div>

        <div className="flex justify-between items-center p-4">
          <div>
            <label htmlFor="">Show Entries: </label>
            <select name="entries" id="entries" value={entriesToShow} onChange={handleEntriesChange} className="p-1 px-3 border border-gray-300 rounded-md">
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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-Green">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Picture</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Full Name</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Position</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Date Added</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white divide-y divide-gray-300">
              {officials.slice(startIndex, endIndex).map((official, index) => (
                <tr key={index} className="hover:bg-Grey">
                  <td className="px-6 py-4 flex justify-center items-center">
                    <img src="https://via.placeholder.com/50" alt="Profile" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-6 py-3">{official.name}</td>
                  <td className="px-6 py-3">{official.position}</td>
                  <td className="px-6 py-3">{official.dateAdded}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block bg-green-200 text-green-800 rounded-full px-2 py-1 text-xs font-medium ${official.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {official.status}
                    </span>
                  </td>
                  <td className=" space-x-2 px-6 py-3">
                    <button title="Edit" className="text-xl text-blue-500 hover:text-blue-700 focus:outline-none">
                      <FaEdit />
                    </button>
                    <button onClick={setIsdeleteModal} title="Delete" className="text-xl text-red-500 hover:text-red-700 focus:outline-none">
                      <MdDelete />
                    </button>
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


        <OfficialsModal isOpen={isModalOpen} onClose={closeModal} />
      </div>


      {/* For Delete Button */}
      {deleteModal &&
        <div className='fixed top-0 left-0 m-0 h-full w-full flex justify-center items-center z-50'>
          <div className='bg-white w-96 h-72 rounded-xl shadow-xl drop-shadow-xl flex flex-col justify-center items-center gap-y-5'>
            <IoWarningOutline className='text-6xl p-2 rounded-full bg-red-200 text-red-600 font-bold' />

            <p className='text-center px-5'>This action cannot be undone. All information of this person will be lost.</p>

            <div className='w-full px-5 flex flex-col gap-y-3'>
              <button className='bg-Red text-White w-full p-1 rounded-md font-semibold'>Delete</button>

              <button onClick={closeDeleteModal} className='text-black w-full p-1 rounded-md border border-gray-300 font-semibold'>Cancel</button>
            </div>
          </div>
        </div>
      }

    </section>
  )
}

export default Officials