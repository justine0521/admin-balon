import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaFileExport, FaEye } from 'react-icons/fa';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import { BsPersonFillSlash } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Accounts() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/accounts`);
                setAccounts(response.data);
            } catch (error) {
                console.error("Error fetching accounts: ", error);
            }
        };
        fetchAccounts();
    }, []);

    const toggleDropdown = (accountId) => {
        // Close the dropdown if it's already open, otherwise open it
        setOpenDropdown(prevId => prevId === accountId ? null : accountId);
    };

    const toggleStatus = async (accountId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';
            await axios.patch(`${API_BASE_URL}/api/accounts/${accountId}/status`, { status: newStatus });

            setAccounts(accounts.map(account =>
                account._id === accountId ? { ...account, status: newStatus } : account
            ));

            // Close the dropdown after status change
            setOpenDropdown(null);
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    const deleteAccount = async (accountId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/accounts/${accountId}`);

            setAccounts(accounts.filter(account => account._id !== accountId));

            // Close the dropdown after account deletion
            setOpenDropdown(null);
        } catch (error) {
            console.error("Error deleting account: ", error);
        }
    };

    return (
        <section>
            <div className='flex justify-end items-center h-16 px-5 w-full'>
                <NavLink to={"/signup"}>
                    <button className='px-2 py-1 bg-green-500 flex items-center gap-1 rounded-md text-white hover:bg-green-400'>
                        <FaPlus /> Add
                    </button>
                </NavLink>
            </div>

            <div className='border p-3'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='text-left text-gray-500'>Profile</th>
                            <th className='text-left text-gray-500'>Name</th>
                            <th className='text-left text-gray-500'>Position</th>
                            <th className='text-left text-gray-500'>Email</th>
                            <th className='text-left text-gray-500'>Status</th>
                            <th className='text-center text-gray-500'>Action</th>
                        </tr>
                    </thead>

                    <tbody className='m-5'>
                        {accounts.map((account) =>
                            <tr key={account._id}>
                                <td className='text-left py-3'>
                                    <img src={account.imageUrl} alt="" className='h-12 w-12 rounded-full' />
                                </td>
                                <td className='text-left py-3'>{account.fullName}</td>
                                <td className='text-left py-3'>{account.position}</td>
                                <td className='text-left py-3'>{account.email}</td>
                                <td className='text-left py-3'>
                                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${account.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                        {account.status}
                                    </span>
                                </td>
                                <td>
                                    <div className='flex justify-center'>
                                        <button onClick={() => toggleDropdown(account._id)} className='bg-green-500 text-white px-2 py-1 flex justify-center rounded'>
                                            <span className='flex items-center'>Action <IoMdArrowDropdown /></span>
                                        </button>
                                    </div>

                                    {openDropdown === account._id && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
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
            </div>
        </section>
    );
}

export default Accounts;
