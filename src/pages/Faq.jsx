import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import AddFaqModal from '../Modal/AddFaqModal';
import EditFaqModal from '../Modal/EditFaqModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Faq() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState('');
  const [editingFaq, setEditingFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingFaq(null);
  };

  const fetchFaqs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs`);
      if (response.ok) {
        const data = await response.json();
        setFaqs(data);
      } else {
        throw new Error('Failed to fetch FAQs');
      }
    } catch (err) {
      setError('Unable to load FAQs. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setFaqs(faqs.filter((faq) => faq._id !== id));
      } else {
        throw new Error('Failed to delete FAQ');
      }
    } catch (err) {
      setError('Unable to delete FAQ. Please try again later.');
    }
  };

  const saveFaq = async (faq, onClose) => {
    try {
      const response = editingFaq
        ? await fetch(`${API_BASE_URL}/api/faqs/${editingFaq._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(faq),
          })
        : await fetch(`${API_BASE_URL}/api/faqs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(faq),
          });

      const data = await response.json();

      if (response.ok) {
        fetchFaqs();
        onClose();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to save FAQ:', error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const totalPages = Math.ceil(faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase())).length / entriesToShow);
  const paginatedFaqs = faqs
    .filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEntriesChange = (e) => {
    const value = Math.max(5, Number(e.target.value));
    setEntriesToShow(value);
    setCurrentPage(1);
  };

  return (
    <section>
      <div className="flex flex-wrap items-center px-3 h-14 justify-between border-b-2 border-gray-400">
        <h1 className="font-medium text-xl">Frequently Asked Questions</h1>
        <button onClick={openAddModal} className="flex items-center justify-center gap-1 py-1.5 px-4 text-sm bg-Green text-white rounded-md hover:bg-green-500">
          <FaPlus /> FAQ
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex justify-between items-center py-4">
        <div>
          <label htmlFor="">Show Entries: </label>
          
          <select name="entries" id="entries" value={entriesToShow} onChange={handleEntriesChange} className="p-1 px-3 border border-gray-300 rounded-md">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <form>
          <label htmlFor="search">Search: </label>
          
          <input type="text" name="search" id="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-Green"/>
        </form>
      </div>

      <table className="w-full border-collapse">
        <thead className="bg-Green text-white">
          <tr>
            <th className="py-3 px-4 text-left font-semibold border">Question</th>
            <th className="py-3 px-4 text-left font-semibold border">Answer</th>
            <th className="py-3 px-4 text-left font-semibold border">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFaqs.map((faq) => (
            <tr key={faq._id} className="hover:bg-white border-b">
              <td className="py-3 px-4 text-left font-semibold">{faq.question}</td>
              <td className="py-3 px-4 text-left text-sm">{faq.answer}</td>
              <td className="py-3 px-4 text-left font-semibold flex gap-2 items-center w-full">
                <button title="Edit" className="text-xl text-blue-500 hover:text-blue-700" onClick={() => openEditModal(faq)}>
                  <FaEdit />
                </button>

                <button title="Delete" className="text-xl text-red-500 hover:text-red-700" onClick={() => handleDelete(faq._id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {faqs.length > entriesToShow && (
        <div className="flex justify-between items-center p-5 text-sm">
            <button onClick={handlePrevious} className={`p-2 border border-Green rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "" }`} disabled={currentPage === 1}>
                Previous
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button onClick={handleNext} className={`p-2 border border-Green rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "" }`} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
      )}

      <AddFaqModal isOpen={isAddModalOpen} onClose={closeAddModal} saveFaq={saveFaq} />
      <EditFaqModal isOpen={isEditModalOpen} onClose={closeEditModal} saveFaq={(faq) => saveFaq(faq, closeEditModal)} editingFaq={editingFaq} />
    </section>
  );
}

export default Faq;
