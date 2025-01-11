import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddFaqModal({ isOpen, onClose }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      setIsSubmitting(true);
      setErrorMessage('');

      try {
        const response = await fetch(`${API_BASE_URL}/api/faq`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question, answer }),
        });

        const responseData = await response.json();

        if (response.ok) {
          setQuestion('');
          setAnswer('');
          onClose();
        } else {
          setErrorMessage(responseData.message || 'Failed to add FAQ. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Unable to connect to the server. Please check your connection.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrorMessage('Both question and answer are required.');
    }
  };

  return (
    <section className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500">
          <IoClose />
        </button>
        
        <h2 className="text-2xl font-medium mb-4">Add FAQ</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700">
              Question
            </label>
            
            <input id="question" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-1 py-2 outline-none block w-full border-b border-gray-300 shadow-sm sm:text-sm" placeholder="Enter the question" required/>
          </div>
          
          <div className="mb-4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
              Answer
            </label>
            
            <textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className="mt-1 block w-full border-b resize-none border-gray-300 shadow-sm sm:text-sm outline-none" placeholder="Enter the answer" required></textarea>
          </div>

          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          
          <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} className="px-5 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddFaqModal;
