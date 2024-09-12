import React, { useState, useEffect } from 'react';
import BarangayInfo from '../settings/BarangayInfo';
import Accounts from '../settings/Accounts';
import '../App.css'

function Settings() {
  const [activeTab, setActiveTab] = useState('barangayInfo');
  const [position, setPosition] = useState(''); // State to store the user's position
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    if (userProfile) {
      setPosition(userProfile.position);
      setLoading(false);
    } else {
      // Handle case where profile is not available
      setLoading(false);
    }
  }, []);

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

  return (
    <section className="w-4/5 h-full mt-14 left-56 p-7 absolute hide-scrollbar">
      <div className="flex items-center gap-x-5 mb-5">
        <button
          className={`p-1 text-xl ${activeTab === 'barangayInfo' ? 'border-b-2 border-b-Green text-Green' : 'hover:text-green-500'}`}
          onClick={() => setActiveTab('barangayInfo')}
        >
          Barangay Info
        </button>

        {position === 'Admin' && (
          <button
            className={`p-1 text-xl ${activeTab === 'accounts' ? 'border-b-2 border-b-Green text-Green' : 'hover:text-green-500'}`}
            onClick={() => setActiveTab('accounts')}
          >
            Accounts
          </button>
        )}
      </div>

      <div>
        {activeTab === 'barangayInfo' && <BarangayInfo />}
        {activeTab === 'accounts' && position === 'Admin' && <Accounts />}
      </div>
    </section>
  );
}

export default Settings;
