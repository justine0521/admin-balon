import { useState } from 'react';
import Profile from '../images/defaultProfile.png'

import { IoClose } from "react-icons/io5";

function EditResidence({ isOpen, onClose }) {

    //Upload Picture
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

    if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 pt-16 overflow-auto">
        <div className="bg-white px-8 py-4 w-4/5 h-fit rounded shadow-lg">
  
          <header className='flex justify-between items-center border-b-2 border-b-Green'>
            <h2 className="text-md text-center">Edit Resident Profile</h2>
  
            <button onClick={onClose} className="text-red-500 text-2xl p-1 hover:bg-gray-100 hover:rounded-full"> <IoClose /> </button>
          </header>
      
          <form action="" className='flex'>
  
            <div className='w-56 text-sm mt-3'>
              <div className='flex flex-col gap-y-3'>
                
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" style={{ width: '300px', height: '200px', marginTop: '10px', border: '1px solid #ccc' }} />
                  ) : (
                    <img src={Profile} alt="Default Preview" style={{ width: '300px', height: '200px', marginTop: '10px', border: '1px solid #ccc' }} />
                  )}
  
                  <input onChange={handleImageChange} type="file" accept="image/*" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                
              </div>
  
              <div className='flex flex-col mt-3'>
                <label htmlFor="household" className='font-semibold'>Household No.</label>
  
                <select name="household" id="household" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green">
                  <option value="">Household No.</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="More than 5">More than 5</option>
                </select>
              </div>
  
              <div className='flex flex-col mt-3'>
                <label htmlFor="precinct" className='font-semibold'>Precinct No.</label>
                
                <select name="precinct" id="precinct" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green">
                  <option value="">Precinct No.</option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
            </div>
            
            <div className='w-full'>
              <div className='flex text-sm mt-3'>
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="Fname" className='font-semibold'>First Name</label>
                    <input type="text" name='Fname' id='Fname' placeholder='Enter First Name' className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                  </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="Mname" className='font-semibold'>Middle Name</label>
                    <input type="text" name='Mname' id='Mname' placeholder='Enter Middle Name' className="border border-gray-300 rounded-md py-1 p-2  focus:outline-none focus:border-Green"/>
                  </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="Lname" className='font-semibold'>Last Name</label>
                    <input type="text" name='Lname' id='Lname' placeholder='Enter Last Name' className="border border-gray-300 rounded-md py-1 p-2  focus:outline-none focus:border-Green"/>
                  </div>
              </div>
  
                <div className='flex text-sm mt-3'>
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="alias" className='font-semibold'>Alias</label>
                    <input type="text" name='alias' id='alias' placeholder='Alias' className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                  </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="birthPlace" className='font-semibold'>Place of Birth</label>
                    <input type="text" name='birthPlace' id='birthPlace' placeholder='Place of Birth' className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                  </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="birthDate" className='font-semibold'>Birth Date</label>
                    <input type="date" name='birthDate' id='birthDate' placeholder='Birth Date' className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                  </div>
                </div>
  
                <div className='flex text-sm mt-3'>
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="age" className='font-semibold'>Age</label>
                    <input type="text" name='age' id='age' placeholder='Age' className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                  </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="civilStatus" className='font-semibold'>Civil Status</label>
  
                    <select name="civilStatus" id="civilStatus" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green">
                      <option value="">Civil Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="gender" className='font-semibold'>Gender</label>
  
                    <select name="gender" id="gender" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green">
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
  
                  </div>
                </div>
  
                <div className='flex text-sm mt-3'>
                    <div className='w-full flex flex-col mx-3'>
                        <label htmlFor="street" className='font-semibold'>Street</label>
    
                        <select name="street" id="street" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green">
                        <option value="">Street</option>
                        <option value="Street 1">Street 1</option>
                        <option value="Street 2">Street 2</option>
                        <option value="Street 3">Street 3</option>
                        <option value="Street 4">Street 4</option>
                        </select>
                    </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="voterStatus" className='font-semibold'>Voter's Status</label>
  
                    <select name="voterStatus" id="voterStatus" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green">
                      <option value="">Voter's Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="occupation" className='font-semibold'>Occupation</label>
                    <input type="text" name='occupation' id='occupation' placeholder='N/A if none' className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                  </div>
                </div>
  
                <div className='text-sm mt-3 flex justify-center items-center gap-y-2 mx-3'>
                  <div className='w-full flex flex-col'>
                    <label htmlFor="citizenship" className='font-semibold'>Citizenship</label>
                    <input type="text" name='citizenship' id='citizenship' placeholder='Citizenship' className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green"/>
                  </div>

                  <div className='w-full flex flex-col mx-3'>
                    <label htmlFor="lifeStatus" className='font-semibold'>Life Status</label>
                    <select name="lifeStatus" id="lifeStatus" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-Green">
                      <option value="Alive">Alive</option>
                      <option value="Deceased">Deceased</option>
                    </select>
                  </div>
                </div>

                <div className='flex flex-col mt-3 mx-3'>
                  <label htmlFor="address" className='font-semibold'>Address</label>
                  <textarea name="address" id="address"  rows="3" className="border border-gray-300 rounded-md resize-none py-1 p-2 focus:outline-none focus:border-Green"></textarea>
                </div>
            </div>
  
          </form>
  
        <div className='flex justify-end mt-16 py-3 px-3 border-2'>
          <button className="text-White bg-Blue px-3 py-1 rounded-md hover:bg-blue-600">Save</button>
        </div>
          
        </div>
      </div>
  )
}

export default EditResidence