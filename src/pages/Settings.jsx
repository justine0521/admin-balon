import React, { useContext, useRef, useState } from 'react';
import BarangayInfo from '../settings/BarangayInfo'
import Accounts from '../settings/Accounts';

function Settings() {
  const [activeTab, setActiveTab] = useState('barangayInfo');

  return (
    <section className="w-4/5 h-full mt-14 left-56 p-7 absolute hide-scrollbar">
      <div className="flex items-center gap-x-5 mb-5">
        <button className={`p-1 text-xl ${activeTab === 'barangayInfo' ? 'border-b-2 border-b-Green text-Green' : 'hover:text-green-500'}`} onClick={() => setActiveTab('barangayInfo')}>
          Barangay Info
        </button>
            
        <button className={`p-1 text-xl ${activeTab === 'accounts' ? 'border-b-2 border-b-Green text-Green' : 'hover:text-green-500'}`} onClick={() => setActiveTab('accounts')}>
          Accounts
        </button>
      </div>

      <div>
        {activeTab === 'barangayInfo' && <BarangayInfo />}
        {activeTab === 'accounts' && <Accounts />}

        
      </div>
    </section>
  );
}

export default Settings;
