import { useState } from 'react';
import Profile from '../images/defaultProfile.png';
import { IoClose } from "react-icons/io5";

// Modal Component
function ResidenceModal({ isOpen, onClose, onAddResident }) {
  if (!isOpen) return null;

  const [errorMessage, setErrorMessage] = useState('');

  // Upload Picture
  const [imageUrl, setImageUrl] = useState(Profile);

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

  const [residenceData, setResidenceData] = useState({
      fName: '', mName: '', lName: '', alias: '', birthPlace: '', birthDate: '', age: '', 
      civilStatus: '', gender: '', street: '', voterStatus: '', occupation: '', citizenship: '', 
      lifeStatus: '', address: ''
  });

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setResidenceData({ ...residenceData, [name]: value });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      const isEmpty = Object.values(residenceData).some(value => value === '');
      if (isEmpty) {
          setErrorMessage('Please fill in all required fields.');
      } else {
          onAddResident({ ...residenceData, imageUrl, id: Date.now() });
          onClose();
      }
  };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 pt-16 overflow-auto">
            <div className="bg-white px-8 py-6 w-4/5 h-fit rounded-md shadow-lg">

            {errorMessage && 
            <div className="text-red-600 mb-2">
              {errorMessage}
            </div>}

                <header className='flex justify-between items-center border-b-2 border-green-600 pb-2'>
                    <h2 className="text-lg">New Residence Registration Form</h2>
                    <button onClick={onClose} className="text-red-500 text-2xl p-1 hover:bg-gray-200 hover:rounded-full">
                        <IoClose />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className='flex gap-x-6 mt-4'>
                    <div className='w-1/4 text-sm'>
                        <div className='flex flex-col gap-y-3'>
                            <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover border border-gray-300 rounded" />
                            <input
                                id="imageUpload"
                                onChange={handleImageChange}
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                            />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <label htmlFor="household" className='font-semibold'>Household No.</label>
                            <select name="household" id="household" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600">
                                <option value="">Select Household No.</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">More than 5</option>
                            </select>
                        </div>

                        <div className='flex flex-col mt-4'>
                            <label htmlFor="precinct" className='font-semibold'>Precinct No.</label>
                            <select name="precinct" id="precinct" className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600">
                                <option value="">Select Precinct No.</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                    </div>

                    <div className='w-3/4'>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='flex flex-col'>
                                <label htmlFor="fName" className='font-semibold'>First Name</label>
                                <input
                                    type="text"
                                    name='fName'
                                    id='fName'
                                    placeholder='Enter First Name'
                                    value={residenceData.fName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="mName" className='font-semibold'>Middle Name</label>
                                <input
                                    type="text"
                                    name='mName'
                                    id='mName'
                                    placeholder='Enter Middle Name'
                                    value={residenceData.mName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="lName" className='font-semibold'>Last Name</label>
                                <input
                                    type="text"
                                    name='lName'
                                    id='lName'
                                    placeholder='Enter Last Name'
                                    value={residenceData.lName}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="alias" className='font-semibold'>Alias</label>
                                <input 
                                    type="text" 
                                    name='alias' 
                                    id='alias' 
                                    placeholder='Alias' 
                                    value={residenceData.alias}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600" 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="birthPlace" className='font-semibold'>Place of Birth</label>
                                <input 
                                    type="text" 
                                    name='birthPlace' 
                                    id='birthPlace' 
                                    placeholder='Place of Birth'
                                    value={residenceData.birthPlace}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600" 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="birthDate" className='font-semibold'>Birth Date</label>
                                <input 
                                    type="date" 
                                    name='birthDate' 
                                    id='birthDate' 
                                    placeholder='Birth Date' 
                                    value={residenceData.birthDate}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600" 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="age" className='font-semibold'>Age</label>
                                <input
                                    type="text"
                                    name='age'
                                    id='age'
                                    placeholder='Enter Age'
                                    value={residenceData.age}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="civilStatus" className='font-semibold'>Civil Status</label>
                                <select
                                    name="civilStatus"
                                    id="civilStatus"
                                    value={residenceData.civilStatus}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                >
                                    <option value="">Select Civil Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="gender" className='font-semibold'>Gender</label>
                                <select
                                    name="gender"
                                    id="gender"
                                    value={residenceData.gender}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="street" className='font-semibold'>Street</label>
                                <select 
                                    name="street" 
                                    id="street" 
                                    value={residenceData.street}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                >
                                    <option value="">Select Street</option>
                                    <option value="Street 1">Street 1</option>
                                    <option value="Street 2">Street 2</option>
                                    <option value="Street 3">Street 3</option>
                                    <option value="Street 4">Street 4</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="voterStatus" className='font-semibold'>Voter's Status</label>
                                <select
                                    name="voterStatus"
                                    id="voterStatus"
                                    value={residenceData.voterStatus}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                >
                                    <option value="">Select Voter's Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="occupation" className='font-semibold'>Occupation</label>
                                <input 
                                    type="text" 
                                    name='occupation' 
                                    id='occupation' 
                                    placeholder='N/A if none' 
                                    value={residenceData.occupation}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600" 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="citizenship" className='font-semibold'>Citizenship</label>
                                <input 
                                    type="text" 
                                    name='citizenship' 
                                    id='citizenship' 
                                    placeholder='Enter Citizenship' 
                                    value={residenceData.citizenship}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600" 
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="lifeStatus" className='font-semibold'>Life Status</label>
                                <select 
                                    name="lifeStatus" 
                                    id="lifeStatus" 
                                    value={residenceData.lifeStatus}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md py-1 p-2 focus:outline-none focus:border-green-600"
                                >
                                    <option value="">Select Life Status</option>
                                    <option value="Alive">Alive</option>
                                    <option value="Deceased">Deceased</option>
                                </select>
                            </div>

                            <div className='flex flex-col col-span-3'>
                                <label htmlFor="address" className='font-semibold'>Address</label>
                                <textarea 
                                    name="address" 
                                    id="address" 
                                    rows="3" 
                                    value={residenceData.address}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md resize-none py-1 p-2 focus:outline-none focus:border-green-600"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </form>

                <div className='flex justify-end mt-8'>
                    <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
                </div>
            </div>
        </div>
    );
}

export default ResidenceModal;