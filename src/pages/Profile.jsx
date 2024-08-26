import React, { useRef, useContext, useState } from 'react';
import ProfileContext from './ProfileContext';
import Icon from '../images/defaultProfile.png';

function Profile() {
  const { imageUrl, setImageUrl } = useContext(ProfileContext);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profileInfo');

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(Icon);
    }
  }

  function handleButtonClick() {
    fileInputRef.current.click();
  }

  return (
    <section className="w-4/5 h-fit mt-14 left-56 p-7 absolute">
      <p className='text-3xl'>Profile</p>

      <div className='flex justify-between mt-5'>
        <div className='bg-white h-64 w-56 px-5 flex flex-col justify-center items-center border border-gray-300 rounded'>
          <img src={imageUrl} alt="Profile Preview" style={{ width: '100px', height: '100px', marginTop: '10px', border: '1px solid #ccc', borderRadius: '100px', objectFit: 'cover', }} />
          <p className='text-2xl'>Justine Santos</p>
          <p className='text-sm mt-2'>admin@gmail.com</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />

          <button onClick={handleButtonClick} className='bg-Green w-full text-White p-2 py-1 mt-5 rounded-md'>
            Change Profile
          </button>
        </div>

        <div className='bg-white h-fit w-3/4 ml-5 border border-gray-300 rounded'>
          <nav className='border-b text-xl space-x-5 p-3'>
            <button
              className={`p-1 ${activeTab === 'profileInfo' ? 'border-b-2 border-b-Green text-Green' : ''}`}
              onClick={() => setActiveTab('profileInfo')}
            >
              Profile Info
            </button>

            <button
              className={`p-1 ${activeTab === 'accountSecurity' ? 'border-b-2 border-b-Green text-Green' : ''}`}
              onClick={() => setActiveTab('accountSecurity')}
            >
              Account Security
            </button>
          </nav>

          {activeTab === 'profileInfo' && (
            <div>
              <div className='flex justify-between p-3'>
                <label className='font-semibold '>Name</label>
                <input type="text" size={50} className='border border-gray-300 outline-Green' />
              </div>

              <div className='flex justify-between p-3'>
                <label className='font-semibold '>Email</label>
                <input type="email" size={50} className='border border-gray-300 outline-Green' />
              </div>

              <div className='flex justify-between p-3'>
                <label className='font-semibold '>Contact Number</label>
                <input type="text" size={50} className='border border-gray-300 outline-Green' />
              </div>

              <div className='flex justify-between p-3'>
                <label className='font-semibold '>Date Registered</label>
                <input type="text" size={50} className='border border-gray-300 outline-Green' />
              </div>

              <div className='flex justify-end p-3'>
                <button className='bg-Green px-2 py-1 rounded text-White'>Update</button>
              </div>
            </div>
          )}

          {activeTab === 'accountSecurity' && (
            <div>
              <div className='flex justify-between p-3'>
                <label className='font-semibold '>Current Password</label>
                <input type="password" size={50} className='border border-gray-300 outline-Green' />
              </div>

              <div className='flex justify-between p-3'>
                <label className='font-semibold '>New Password</label>
                <input type="password" size={50} className='border border-gray-300 outline-Green' />
              </div>

              <div className='flex justify-between p-3'>
                <label className='font-semibold '>Confirm New Password</label>
                <input type="password" size={50} className='border border-gray-300 outline-Green' />
              </div>

              <div className='flex justify-end p-3'>
                <button className='bg-Green px-2 py-1 rounded text-White'>Update Password</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
