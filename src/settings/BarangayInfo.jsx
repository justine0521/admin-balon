import React, { useContext, useRef } from 'react';
import Logo from '../images/Logo.png';
import LogoContext from '../pages/LogoContext';
import '../App.css'

function Settings() {

  const { imageUrl, setImageUrl } = useContext(LogoContext);
  const fileInputRef = useRef(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(Logo);
    }
  }

  function handleButtonClick() {
    fileInputRef.current.click();
  }

  return (
    <section className="w-11/12 h-full absolute hide-scrollbar">
      <div className="bg-White pb-10">
        <div className="flex justify-between items-center h-16 px-5 w-full border-b-2 border-gray-400">
          <p className="text-2xl">Barangay Information</p>

          <button className='bg-Green text-White p-1 px-3 rounded-sm'>Save</button>
        </div>

        <div className="flex justify-between items-center px-20 mt-5">
          <div className="flex flex-col items-center">
            <label className="text-xl text-gray-600">Barangay Logo</label>
            <img src={imageUrl} alt="Barangay Logo" className="rounded-full w-36 mt-5" />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
          <button onClick={handleButtonClick} className="font-semibold border border-Green p-2 text-Green rounded-xl">CHANGE LOGO</button>
        </div>

        <div className="flex justify-between items-center px-20 mt-10">
          <label className="text-xl text-gray-600">Barangay Name</label>
          <input type="text" size={30} className="border border-gray-600 outline-Green p-1 rounded" />
        </div>

        <div className="flex justify-between items-center px-20 mt-5">
          <label className="text-xl text-gray-600">Contact Number</label>
          <input type="text" size={30} className="border border-gray-600 outline-Green p-1 rounded" />
        </div>

        <div className="flex justify-between items-center px-20 mt-5">
          <label className="text-xl text-gray-600">Barangay Email</label>
          <input type="text" size={30} className="border border-gray-600 outline-Green p-1 rounded" />
        </div>
        
      </div>
    </section>
  );
}

export default Settings;
