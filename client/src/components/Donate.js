import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Donate = () => {
  // State for form data
  const [donationData, setDonationData] = useState({
    name: '',
    itemName: 'Money', // Default item is Money
    amount: 0, // Default amount
    paymentMethod: 'Online', // Default payment method
    mobileNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
    description: ''
  });

  // State to handle form submission status
  const [status, setStatus] = useState('');

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await axios.post('https://livescare.onrender.com/api/user/donor', donationData);
      if (response.status === 200) {
        setStatus('Donation Successful!');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setStatus('Error submitting donation. Please try again.');
    }
  };

  // Function to handle button click and set the payment method
  const handleButtonClick = (paymentMethod) => {
    // Set the payment method in donationData
    setDonationData((prevState) => ({
      ...prevState,
      paymentMethod: paymentMethod,
    }));
  };

  return (
    <div>
      {/* Background Image and Text Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/Assets/Donatemain.jfif)' }}>
        <div className="relative z-10 flex items-center justify-center h-full px-6 text-white ml-9">
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center">Donate Now!</h1>
            <p className="text-lg text-center">Donate Now To help People</p>
          </div>
        </div>
      </section>

      {/* Button Section */}
      <div className="py-28 px-6 sm:px-12 flex flex-col items-center space-y-14">
        {/* Button 1: Donate Money (Online) */}
        <button
          onClick={() => handleButtonClick('Online')} // Sets paymentMethod to 'Online'
          className="w-full sm:w-2/3 lg:w-1/1 text-[#FCA311] py-6 border border-[#FCA311] text-3xl hover:bg-[#FCA311] hover:text-white transition duration-300 font-bold"
        >
          Online Cash Payment
        </button>

        {/* Button 2: Donate Goods (Offline) */}
        <button
          onClick={() => handleButtonClick('Offline')} // Sets paymentMethod to 'Offline'
          className="w-full sm:w-2/3 lg:w-1/1 text-[#FCA311] py-6 border border-[#FCA311] text-3xl hover:bg-[#FCA311] hover:text-white transition duration-300 font-bold"
        >
          Offline Cash Payment
        </button>

        {/* Donation Form */}
        <form onSubmit={handleSubmit} className="w-full sm:w-2/3 lg:w-1/2 mt-8">
          {/* Amount Field (only for Money donations) */}
          {donationData.itemName === 'Money' && (
            <div className="mb-4">
              <label htmlFor="amount" className="block text-lg font-semibold">Amount</label>
              <input 
                type="number" 
                id="amount"
                name="amount" 
                min="0" 
                max="10000" 
                value={donationData.amount}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Payment Method (only for Money donations) */}
          {donationData.itemName === 'Money' && (
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block text-lg font-semibold">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={donationData.paymentMethod}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          )}

          {/* Other Donation Fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold">Your Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={donationData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-lg font-semibold">Mobile Number</label>
            <input 
              type="text" 
              id="mobileNumber" 
              name="mobileNumber"
              value={donationData.mobileNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={donationData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-lg font-semibold">State</label>
            <input 
              type="text" 
              id="state" 
              name="state" 
              value={donationData.state}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-lg font-semibold">City</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              value={donationData.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-semibold">Address</label>
            <input 
              type="text" 
              id="address" 
              name="address"
              value={donationData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="pincode" className="block text-lg font-semibold">Pincode</label>
            <input 
              type="text" 
              id="pincode" 
              name="pincode"
              value={donationData.pincode}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-semibold">Description</label>
            <textarea
              id="description"
              name="description"
              value={donationData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full sm:w-2/3 lg:w-1/2 py-4 bg-[#FCA311] text-white font-bold text-xl hover:bg-orange-500 transition duration-300"
            >
              Submit Donation
            </button>
          </div>

          {/* Status Message */}
          {status && <p className="text-center text-xl text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Donate;