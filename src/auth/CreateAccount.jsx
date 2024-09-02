import React, { useState } from 'react';
import axios from 'axios';

function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/accounts', formData);
      if (response.status === 200) {
        alert("Account created successfully!");
        // Clear the form fields
        setFormData({
          fullName: '',
          position: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      alert("Error creating account: " + error.message);
    }
  };
  
  return (
    <section className="w-4/5 h-screen mt-14 left-56 p-7 absolute">
      <div className='flex justify-center p-10 h-fit bg-gray-100'>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                Position
              </label>
              <input type="text" id="position" value={formData.position} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            <a href="#" className="text-blue-500 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
