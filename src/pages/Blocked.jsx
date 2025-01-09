import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoWarningOutline } from "react-icons/io5";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function Blocked() {
  const [blocklist, setBlocklist] = useState([]);
  const [blockModal, setBlockModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [personData, setPersonData] = useState({
    fullName: '',
    email: '',
    birthday: '',
    reason: ''
  });
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchBlocklist = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/blocklist`);
      setBlocklist(data);
    } catch (error) {
      console.error("Failed to fetch blocklist:", error);
    }
  };

  const handleBlock = (person) => {
    setSelectedPerson(person);
    setPersonData({
      fullName: person.fullName,
      email: person.email,
      birthday: person.birthday,
      reason: person.reason
    });
    setBlockModal(true);
  };

  const handleDelete = async () => {
    if (showDeleteModal) {
      try {
        await axios.delete(`${API_BASE_URL}/api/blocklist/${showDeleteModal}`);
        fetchBlocklist();
        setShowDeleteModal(null);
      } catch (error) {
        console.error("Failed to delete blocklist entry:", error);
      }
    }
  };

  const handleAddOrUpdate = async () => {
    if (validateInputs()) {
      setError('');

      if (selectedPerson) {
        try {
          await axios.put(`${API_BASE_URL}/api/blocklist/${selectedPerson._id}`, personData);
          fetchBlocklist();
          setBlockModal(false);
          setSelectedPerson(null);
        } catch (error) {
          console.error("Failed to update blocklist entry:", error);
        }
      } else {
        try {
          await axios.post(`${API_BASE_URL}/api/blocklist`, personData);
          fetchBlocklist();
          resetForm();
        } catch (error) {
          console.error("Failed to add to blocklist:", error);
        }
      }
    }
  };

  const resetForm = () => {
    setPersonData({
      fullName: '',
      email: '',
      birthday: '',
      reason: ''
    });
    setBlockModal(false);
    setSelectedPerson(null);
  };

  const validateInputs = () => {
    const { fullName, email, birthday, reason } = personData;
    if (!fullName || !email || !birthday || !reason) {
      setError('All fields must be filled.');
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    const birthdayPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthdayPattern.test(birthday)) {
      setError('Please enter a valid birthday (YYYY-MM-DD).');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setPersonData({ ...personData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchBlocklist();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Blocklisted Residents</h2>
      <button
        onClick={() => setBlockModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-3 flex items-center space-x-2 hover:bg-green-600"
      >
        <FaPlus className="text-sm" />
        <span>Add to Blocklist</span>
      </button>

      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Reason</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blocklist.map((person) => (
            <tr key={person._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{person.fullName}</td>
              <td className="border px-4 py-2">{person.reason}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleBlock(person)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(person._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <IoWarningOutline className="text-red-500 text-4xl mb-3" />
            <p>Are you sure you want to delete this entry?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {blockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{selectedPerson ? 'Edit Blocklist Entry' : 'Add to Blocklist'}</h3>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="mb-3">
              <label htmlFor="fullName" className="block mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={personData.fullName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={personData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="block mb-1">Birthday</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={personData.birthday}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reason" className="block mb-1">Reason</label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={personData.reason}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleAddOrUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {selectedPerson ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => setBlockModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blocked;
