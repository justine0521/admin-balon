import { useState } from 'react';
import DonutChart from '../Charts/Chart';
import '../App.css'

//Import Icons Here
import { IoWarningOutline } from "react-icons/io5";
import { TbCurrencyPeso } from "react-icons/tb";

function Revenue() {

  const [deleteModal, setIsDeleteModal] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value));
    setCurrentPage(1);
  };

  const revenue = [
    { date: '09-12-2024', recipient: 'Justine Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Justine Basibas', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Rency Delos Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Angelica Pyee Arquiza', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Ronel Magcalas', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'CJ Ocampo', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Jim Ver Pol Dimaano', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Charls Pakingking', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Justine Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Justine Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Justine Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Justine Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Justine Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },
    { date: '09-12-2024', recipient: 'Justine Santos', details: 'Barangay Clearance Payment', amount: '100', username: 'admin' },

  ];

  const totalPages = Math.ceil(revenue.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  // Define the data for the first chart
  const revenueData = {
    labels: ['Barangay Clearance', 'Residency', 'Indigency', 'Good Moral', 'Business Clearance', 'Death Certificate', 'No Property', 'Low Income', 'New Residents', 'Solo Parents'],
    datasets: [
      {
        label: 'Issued',
        data: [12, 19, 3, 5, 2, 3, 6, 10, 4, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define the data for the second chart
  const certificateData = {
    labels: ['Apple', 'Samsung', 'Huawei', 'Oppo', 'Vivo', 'Xiaomi'],
    datasets: [
      {
        label: 'Market Share',
        data: [30, 20, 10, 15, 10, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section className="w-4/5 h-screen mt-14 left-56 p-7 absolute hide-scrollbar">

      <div className='w-full flex justify-center items-center gap-x-3'>
        <div className='w-72 h-32 border rounded-md'>
          <p className='bg-Green p-2 text-White rounded-t-md'>Overall Report</p>

          <div className='p-2 flex flex-col gap-y-2'>
            <p className='font-semibold flex items-center text-2xl'><TbCurrencyPeso /> 100,123.00</p>
            <p>Total Income</p>
          </div>
        </div>

        <div className='w-72 h-32 border rounded-md'>
          <p className='bg-Green p-2 text-White rounded-t-md'>Report This Month</p>

          <div className='p-2 flex flex-col gap-y-2'>
            <p className='font-semibold flex items-center text-2xl'><TbCurrencyPeso /> 100,123.00</p>
            <p>Total Income</p>
          </div>
        </div>

        <div className='w-72 h-32 border rounded-md'>
          <p className='bg-Green p-2 text-White rounded-t-md'>Report Today</p>

          <div className='p-2 flex flex-col gap-y-2'>
            <p className='font-semibold flex items-center text-2xl'><TbCurrencyPeso /> 100,123.00</p>
            <p>Total Income</p>
          </div>
        </div>

      </div>

      {/* Render DonutChart Components with different data
      <div className='w-full h-90 mt-10 mb-10 flex justify-between'>
        <div className='mb-10 shadow-2xl border rounded-md'>
          <p className='bg-Green text-White p-2 rounded-t-md'>Overall Revenue Report</p>

          <div className="w-96 h-64 mb-5">
            <DonutChart data={revenueData} options={options} />
          </div>
        </div>

        <div className='mb-10 shadow-2xl border rounded-md'>
          <p className='bg-Green text-White p-2 rounded-t-md'>Report This Month</p>

          <div className="w-96 h-64 mb-5">
            <DonutChart data={certificateData} options={options} />
          </div>
        </div>
      </div> */}

      <div className="bg-White mt-10">
        <div className="flex justify-between items-center h-16 px-5 w-full border-b-2 border-gray-400">
          <p className="text-2xl">Revenue</p>

          <div className='flex items-center gap-x-2'>
            <button className="flex justify-center items-center gap-x-1 bg-Blue text-white rounded-md px-3 py-1 hover:bg-blue-500">
              Copy
            </button>
            <button className="flex justify-center items-center gap-x-1 bg-Blue text-white rounded-md px-3 py-1 hover:bg-blue-500">
              CSV
            </button>
            <button className="flex justify-center items-center gap-x-1 bg-Blue text-white rounded-md px-3 py-1 hover:bg-blue-500">
              PDF
            </button>
            <button className="flex justify-center items-center gap-x-1 bg-Blue text-white rounded-md px-3 py-1 hover:bg-blue-500">
              Print
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
          <table className="w-full border-collapse">
            <thead className="bg-Green">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Recipient</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Details</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Amount</th>
                <th className="px-6 py-3 text-xs font-medium text-White uppercase tracking-wider border-l border-r border-gray-300">Username</th>
              </tr>
            </thead>
            <tbody className="text-center bg-white divide-y divide-gray-300">
              {revenue.slice(startIndex, endIndex).map((revenue, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-3">{revenue.date}</td>
                  <td className="px-6 py-3">{revenue.recipient}</td>
                  <td className="px-6 py-3">{revenue.details}</td>
                  <td className="px-6 py-3">{revenue.amount}</td>
                  <td className="px-6 py-3">{revenue.username}</td>
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
    </section>
  );
}

export default Revenue