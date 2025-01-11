import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

function EditFaqModal({ isOpen, onClose, saveFaq, editingFaq }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (editingFaq) {
      setQuestion(editingFaq.question);
      setAnswer(editingFaq.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [editingFaq]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveFaq({ question, answer }, onClose);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500">
          <IoClose />
        </button>

        <h2 className="text-2xl font-medium mb-4">Edit FAQ</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium mb-1">
              Question
            </label>

            <input type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required className="w-full p-2 border outline-none border-gray-300 rounded-md"/>
          </div>

          <div className="mb-4">
            <label htmlFor="answer" className="block text-sm font-medium mb-1">
              Answer
            </label>

            <textarea id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required className="w-full p-2 border resize-none outline-none border-gray-300 rounded-md"/>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="py-2 px-6 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFaqModal;
