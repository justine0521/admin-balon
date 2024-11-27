import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaFileExport, FaEye } from 'react-icons/fa';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import { BsPersonFillSlash } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import AddAccountModal from '../Modal/AddAccountModal';
import CreateAccount from '../auth/CreateAccount';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Accounts() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for controlling the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false); // Simply close the modal
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/accounts`);
                const filteredAccounts = response.data.filter(account => account.position.toLowerCase() !== 'admin');
                setAccounts(filteredAccounts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching accounts: ", error);
                setLoading(false);
            }
        };
        fetchAccounts();
    }, []);

    const toggleDropdown = (accountId) => {
        setOpenDropdown(prevId => prevId === accountId ? null : accountId);
    };

    const toggleStatus = async (accountId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';
            await axios.patch(`${API_BASE_URL}/api/accounts/${accountId}/status`, { status: newStatus });

            setAccounts(accounts.map(account =>
                account._id === accountId ? { ...account, status: newStatus } : account
            ));

            setOpenDropdown(null);
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    const deleteAccount = async (accountId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/accounts/${accountId}`);

            setAccounts(accounts.filter(account => account._id !== accountId));

            setOpenDropdown(null);
        } catch (error) {
            console.error("Error deleting account: ", error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

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
        <section>
            <div className='flex justify-end items-center h-16 px-5 w-full'>
                <button
                    className='px-2 py-1 bg-green-500 flex items-center gap-1 rounded-md text-white hover:bg-green-600'
                    onClick={() => setIsModalOpen(true)}
                >
                    <FaPlus /> Account
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay fixed flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <CreateAccount closeModal={closeModal} />
                </div>
            )}

            <table className='w-full'>
                <thead>
                    <tr className='bg-green-500'>
                        <th className='text-white font-semibold p-2'>Profile</th>
                        <th className='text-white font-semibold p-2'>Name</th>
                        <th className='text-white font-semibold p-2'>Position</th>
                        <th className='text-white font-semibold p-2'>Email</th>
                        <th className='text-white font-semibold p-2'>Status</th>
                        <th className='text-white font-semibold p-2'>Action</th>
                    </tr>
                </thead>

                <tbody className='m-5 text-center font-thin'>
                    {accounts.map((account) =>
                        <tr key={account._id} className='hover:bg-white'>
                            <td className='py-2 flex justify-center'>
                                <img src={account.imageUrl} alt="" className='h-12 w-12 rounded-full object-cover' />
                            </td>
                            <td className='py-2'>{account.fullName}</td>
                            <td className='py-2'>{account.position}</td>
                            <td className='py-2'>{account.email}</td>
                            <td className='py-2'>
                                <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${account.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                    {account.status}
                                </span>
                            </td>
                            <td>
                                
                            <div className='flex justify-center'>
                                <button onClick={() => toggleDropdown(account._id)} className='bg-green-500 text-white px-2 py-1 flex justify-center rounded'>
                                    <span className='flex items-center gap-1'>
                                        Action {openDropdown === account._id ? <FaAngleUp /> : <FaAngleDown />}
                                    </span>
                                </button>
                            </div>

                                {openDropdown === account._id && (
                                    <div className="absolute right-3 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                        <button className="flex items-center px-4 py-2 text-md text-yellow-500 hover:bg-gray-100 w-full" onClick={() => toggleStatus(account._id, account.status)}>
                                            <BsPersonFillSlash className="mr-2" /> {account.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </button>

                                        <button className="flex items-center px-4 py-2 text-md text-red-500 hover:bg-gray-100 w-full" onClick={() => deleteAccount(account._id)}>
                                            <MdDelete className="mr-2" /> Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default Accounts;
