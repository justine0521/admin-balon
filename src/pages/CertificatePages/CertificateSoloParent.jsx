import { useState } from 'react';
import { NavLink } from 'react-router-dom';

//Import Icons Here
import { FaFileAlt } from "react-icons/fa";

function CertificateSoloParent() {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  }

  const data = [
    {fname: 'Justine', mname: 'Ribano', lname: 'Santos', gender: 'Male', age: '21', status: 'Inactive'},
    {fname: 'Justine', mname: 'Ribano', lname: 'Santos', gender: 'Male', age: '21', status: 'Active'},
  ]

  const totalPages = Math.ceil(data.length / entriesToShow);

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
          <p className='text-xl'>Certificate for Solo Parent Issuance</p>

            <div className='flex justify-center items-center gap-x-2'>
            <NavLink to={'/certificates'}>
              {({isActive}) => (
                <p className={`${isActive ? 'text-gray-300' : 'text-Green'}`}>Certificates</p> 
              )}
            </NavLink>
              / 
            <NavLink to={'/certificate-for-solo-parent'}>
              {({isActive}) => (
                <p className={`${isActive ? 'text-gray-300' : 'text-Green'}`} >Certificate for Solo Parent</p>
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

            <input type="text" name="search" id="search" className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-Green"/>
          </form>
        </div>

        <div className='overflow-x-auto'>
            <table className="w-full border-collapse">
              <thead className="bg-Green">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Picture</th>
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
                {data.slice(startIndex, endIndex).map((resident, index) => (
                  <tr className="hover:bg-gray-100">
                    <td className="px-6 py-4 flex justify-center items-center">
                      <img src="https://via.placeholder.com/50" alt="Profile" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-6 py-3">{resident.fname}</td>
                    <td className="px-6 py-3">{resident.mname}</td>
                    <td className="px-6 py-3">{resident.lname}</td>
                    <td className="px-6 py-3">{resident.gender}</td>
                    <td className="px-6 py-3">{resident.age}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${resident.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {resident.status}
                      </span>
                    </td>
                    <td>
                      <NavLink to={'/barangay-certificate-for-solo-parent'}>
                        <button title='Generate Certificate'>
                          <FaFileAlt className='text-Blue'/>
                        </button>
                      </NavLink>
                    </td>
                  </tr>
                ))}
                  
              </tbody>
            </table>
      </div>

      {/* This is for Previous and Next Button */}
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
  )
}

export default CertificateSoloParent