
import { IoClose } from "react-icons/io5";

function BlotterModal({isOpen, onClose}) {

    if(!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 pt-16 overflow-auto'>
        <div className='bg-White px-5 py-4 my-8 w-8/12 h-fit rounded shadow-lg'>
            <header className="flex justify-between items-center border-b-2 border-Green text-xl">
                <h2>Blotter</h2>

                <button onClick={onClose} className="text-red-500 text-2xl p-1 hover:bg-gray-100 hover:rounded-full"><IoClose /></button>
            </header>

            <form action="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex flex-col">
                        <label htmlFor="complainant" className="font-semibold">Complainant</label>
                        <input type="text" name="complainant" id="complainant" placeholder="Complainant" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="respondent" className="font-semibold">Respondent</label>
                        <input type="text" name="respondent" id="respondent" placeholder="Respondent" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex flex-col">
                        <label htmlFor="victims" className="font-semibold">Victim(s)</label>
                        <input type="text" name="victims" id="victims" placeholder="Victims" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="type" className="font-semibold">Type</label>
                        <select name="type" id="type" className="border border-gray-300 rounded-md py-1 px-1 focus:outline-none focus:border-green-500">
                            <option value="">Blotter Type</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex flex-col">
                        <label htmlFor="location" className="font-semibold">location</label>
                        <input type="text" name="location" id="location" placeholder="Location" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="date" className="font-semibold">Date</label>
                        <input type="date" name="date" id="date" placeholder="Date" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex flex-col">
                        <label htmlFor="time" className="font-semibold">Time</label>
                        <input type="time" name="time" id="time" placeholder="Time" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="status" className="font-semibold">Status</label>
                        <select name="status" id="status" className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500">
                            <option value="">Blotter Status</option>
                            <option value="">Active</option>
                            <option value="">Settled</option>
                            <option value="">Scheduled</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col mt-3">
                    <label htmlFor="details">Details</label>

                    <textarea name="details" id="details" cols="10" rows="4" placeholder="Enter incident here..." className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-green-500"></textarea>
                </div>

                <div className='flex justify-end mt-5 py-3 px-3 border-2'>
                    <button className="text-White bg-Blue px-3 py-1 rounded-md hover:bg-blue-600">Save</button>
                </div>
            </form>







        </div>



    </div>
  )
}

export default BlotterModal