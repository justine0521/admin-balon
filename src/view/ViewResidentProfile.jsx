import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Profile from '../images/defaultProfile.png'
import './view.css'

function ViewResidentProfile({ residentId }) {

//   const [residentData, setResidentData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch resident data based on residentId
//     fetch(`your-api-endpoint/residents/${residentId}`)
//       .then(response => response.json())
//       .then(data => {
//         setResidentData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching resident data:', error);
//         setLoading(false);
//       });
//   }, [residentId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!residentData) {
//     return <div>Resident not found.</div>;
//   }

const handlePrint = () => {
    window.print()
}



  return (
    
    <div className='bg-gray-300 fixed top-0 left-0 w-full h-screen z-50 overflow-auto no-scrollbar'>
      <div className='bg-Grey w-full h-full'>
        <div className='header-container'>
            <header className='bg-White flex justify-between items-center py-3 px-3 border-b-2'>
                <p className='text-xl '>Resident Profile</p>

            <div className='flex gap-x-5'>
                <button onClick={handlePrint} className='border border-Blue text-Blue rounded-full py-1 px-3 transition-all ease-in duration-400 hover:bg-Blue hover:text-White'>Print Report</button>
                
                <NavLink to={'/residence-Record'}>
                    <button  className='border border-Red text-Red rounded-full py-1 px-3 transition-all ease-in duration-400 hover:bg-Red hover:text-White'>Back</button>
                </NavLink>
            </div>
            </header>
        </div>

        <div className='bg-White border-b-2 border-b-gray-400'>
            <div className='flex flex-col justify-center items-center pt-16'>
                <p className='text-center text-lg font-semibold'> <span className='text-2xl'>Republic of the Philippines</span><br /> Province of Bataan <br /> Municipality of Mariveles<br />Barangay Balon Anito</p>
            
                <p className='pt-8 pb-5 text-center text-lg'>Resident Profile</p>
            </div>
        </div>

        <div className='bg-White h-fit pb-10'>
            <div className='flex gap-x-10 px-10 py-5'>
                <img src={Profile} alt="image" className=' h-40 w-40 bg-black'/>

                <div>
                    <p className='text-2xl font-semibold'>Name: <span className=' font-thin'></span></p>
                    <p className='py-1 font-semibold'>Alias: </p>
                    <p className='py-1 font-semibold'>National ID: </p>
                </div>
            </div>

            <div className='px-10'>
                <p className='text-gray-500 font-semibold text-sm'>INFORMATION</p>

                <div className='flex gap-x-44 mt-5'>
                    <div>
                        <p className='py-1 font-semibold'>Birth Date: </p>
                        <p className='py-1 font-semibold'>Age: </p>
                        <p className='py-1 font-semibold'>Civil Status: </p>
                        <p className='py-1 font-semibold'>Gender: </p>
                        <p className='py-1 font-semibold'>Birth Place: </p>
                    </div>

                    <div>
                        <p className='py-1 font-semibold'>Voter Status: </p>
                        <p className='py-1 font-semibold'>Phone: </p>
                        <p className='py-1 font-semibold'>Resident Type: </p>
                        <p className='py-1 font-semibold'>Remarks: </p>
                        <p className='py-1 font-semibold'>Purok: </p>
                    </div>

                    <div>
                        <p className='py-1 font-semibold'>Occupation: </p>
                    </div>
                </div>
            </div>
        </div>
      </div>


    </div>
  );
}

export default ViewResidentProfile;