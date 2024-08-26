import { useState } from 'react';
import Profile from '../images/defaultProfile.png';
import { IoClose } from "react-icons/io5";

function OfficialsModal({isOpen, onClose}) {

    // Upload Picture
    const [imageUrl, setImageUrl] = useState(null);
  
    function handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          setImageUrl(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImageUrl(Profile);
      }
    }

    if(!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
            <div className="bg-white px-3 py-4 w-full lg:w-3/5 max-w-lg h-fit mt-40 mb-5 mx-10 rounded shadow-lg overflow-y-auto">
                <header className="flex justify-between items-center text-lg border-b-2 border-b-green">
                    <h2>New Official</h2>
                    <button onClick={onClose} className="text-red-500 text-2xl p-1 hover:bg-gray-100 hover:rounded-full"><IoClose /></button>
                </header>

                <form action="" className='flex flex-col gap-5'>

                    <div className='lg:mt-5 flex flex-col items-center'>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Preview" className="w-full h-auto lg:w-48 lg:h-48 mt-2 border border-gray-300" />
                        ) : (
                            <img src={Profile} alt="Default Preview" className="w-full h-auto lg:w-48 lg:h-48 mt-2 border border-gray-300" />
                        )}

                        <input onChange={handleImageChange} type="file" accept="image/*" className="border border-gray-300 rounded-md mt-2 py-1 p-2 focus:outline-none focus:border-Green"/>
                    </div>

                    <div className='w-full lg:mt-0'>  
                        <div className="flex flex-col">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" name="fullname" id="fullname" placeholder="Full Name" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                        </div>

                        <div className="flex flex-col mt-3">
                            <label htmlFor="position">Position</label>
                            <select name="position" id="position" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500">
                                <option value="">Select Official Position</option>
                                <option value="">Option 1</option>
                                <option value="">Option 1</option>
                                <option value="">Option 1</option>
                                <option value="">Option 1</option>
                            </select>
                        </div>

                        <div className="flex flex-col mt-3">
                            <label htmlFor="dateAdded">Date Added</label>
                            <input type="date" name="dateAdded" id="dateAdded" placeholder="Date Added" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                        </div>

                        {/* <div className="flex flex-col mt-3">
                            <label htmlFor="teamend">Team End</label>
                            <input type="date" name="teamend" id="teamend" placeholder="Team End" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                        </div> */}

                        <div className="flex flex-col mt-3">
                            <label htmlFor="status">Status</label>

                            <select name="status" id="status" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500">
                                <option value="">Active</option>
                                <option value="">Inactive</option>
                            </select>
                        </div>
                    </div>
                </form>

                <div className='flex justify-end mt-5 py-3 px-3 border-2'>
                    <button className="text-White bg-Blue px-3 py-1 rounded-md hover:bg-blue-600">Save</button>
                </div>
            </div>
        </div>
    );
}

export default OfficialsModal;
