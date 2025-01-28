import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios'; // Import axios if you prefer axios

const DonateNow = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [count, setCount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [donorName, setDonorName] = useState("");
  
  const navigate = useNavigate();

  const states = [
    { name: "Maharshtra", cities: ["Nagpur", "Mumbai", "pune"] },
    { name: "Telengana", cities: ["Hyderabad", "Warangal", "Nizamabad"] },
    { name: "Gujarat", cities: ["Ahmedabad", "Vadodara", "Rajkot"] },
  ];

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity(""); 
  };

  const selectedState = states.find((stateObj) => stateObj.name === state);
  const cities = selectedState ? selectedState.cities : [];

  const toggleFormVisibility = (item) => {
    setSelectedItem(item);
    setIsFormVisible(!isFormVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const data = {
      name: donorName, // Assuming you have a name field or prompt user for it
      itemName: selectedItem,
      count: selectedItem === 'Money' ? undefined : count, // If Money, count is undefined
      amount: selectedItem === 'Money' ? amount : undefined, // If not Money, amount is undefined
      paymentMethod: selectedItem === 'Money' ? paymentMethod : undefined,
      mobileNumber,
      email,
      state,
      city,
      address,
      pincode,
      description,
      status: 'Pending'
    };

    try {
      const response = await axios.post('https://livescare.onrender.com/api/user/donor', data);
      alert('Donation request submitted successfully!');
      setIsFormVisible(false); // Hide the form after submission
    } catch (error) {
      console.error('There was an error!', error);
      alert('Failed to submit donation request. Please try again.');
    }
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

      {/* Section for Choosing Items */}
      <section className="bg-[#F7F7F7] py-16 relative">
        <div className="container mx-auto text-start md:text-center px-4 md:px-0">
          <h2 className="text-4xl font-semibold mt-4">Choose the Items For Donate</h2>
          
        {/* Images Section */}
        <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Image 1 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src="/Assets/chil2.webp"
                alt="Item 1"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Food</p>
              <p>Helping improve their health and quality of life.</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Food')}
              >
                Donate
              </button>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 2 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src="/Assets/chill3.webp"
                alt="Item 2"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Cloths</p>
              <p>By donating clothes, we can make a meaningful difference in the lives</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Cloths')}
              >
                Donate
              </button>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 3 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src="/Assets/chil4.jpg"
                alt="Item 3"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Education</p>
              <p>Access to education a pathway to a brighter future.</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Education')}
              >
                Donate
              </button>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 4 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 mx-2">
              <img
                src="/Assets/chil5.jpg"
                alt="Item 4"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Medical</p>
              <p>Providing medical support improves health outcomes for those in need.</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Medical')}
              >
                Donate
              </button>
            </div>
          </div>

          {/* Repeat the Images Section Below */}
          <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Image 1 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src="/Assets/chil2.webp"
                alt="Item 1"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Toys</p>
              <p>Helping the poor is a vital act of compassion</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Toys')}
              >
                Donate
              </button>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 2 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src="/Assets/chill3.webp"
                alt="Item 2"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Games Kit</p>
              <p>Helping the poor is a vital act of compassion</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Games Kit')}
              >
                Donate
              </button>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 3 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img
                src="/Assets/chil4.jpg"
                alt="Item 3"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Cash</p>
              <p>Helping the poor is a vital act of compassion</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Cash')}
              >
                Donate
              </button>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 4 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 mx-2">
              <img
                src="/Assets/chil5.jpg"
                alt="Item 4"
                className="w-60 h-32 object-cover rounded-full mb-4"
              />
              <p className="text-lg font-semibold">Water Supply</p>
              <p>Helping the poor is a vital act of compassion</p>
              <button
                className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg"
                onClick={() => toggleFormVisibility('Water Supply')}
              >
                Donate
              </button>
            </div>
          
            {/* Repeat for other images... */}

          </div>

          {/* Donation Form Overlay */}
          {isFormVisible && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
              <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 sm:w-1/2 lg:w-2/5 relative">
                <h2 className="text-2xl font-semibold mb-4 text-center">Donate for {selectedItem}</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-lg text-left">Donor Name</label>
                    <input
                      type="text"
                      id="donor-name"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={donorName}  // Bind to donorName
                      onChange={(e) => setDonorName(e.target.value)}  // Update donorName state
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="item-name" className="block text-lg text-left">Item Name</label>
                    <select
                      id="item-name"
                      value={selectedItem}
                      onChange={(e) => setSelectedItem(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Food">Food</option>
                      <option value="Cloths">Clths</option>
                      <option value="Books">Books</option>
                      <option value="Medical">Medical</option>
                      <option value="Toys">Toys</option>
                      <option value="Games Kit">Games Kit</option>
                      <option value="Money">Money</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  {selectedItem === "Money" ? (
                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-lg text-left">Amount</label>
                      <input
                        type="number"
                        id="amount"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label htmlFor="num-items" className="block text-lg text-left">Number of Items</label>
                      <input
                        type="number"
                        id="num-items"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="phone-number" className="block text-lg text-left">Phone Number</label>
                    <input
                      type="tel"
                      id="phone-number"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={mobileNumber}  // Bind to mobileNumber
                      onChange={(e) => setMobileNumber(e.target.value)}  // Update mobileNumber state
                      pattern="^\+?[1-9]\d{1,14}$"
                      required
                    />
                    <small className="text-red-500">Please enter a valid phone number (e.g., +1234567890)</small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-lg text-left">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    />
                    <small className="text-red-500">Please enter a valid email address (e.g., example@example.com)</small>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="state" className="block text-lg text-left">State</label>
                    <select
                      id="state"
                      value={state}
                      onChange={handleStateChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      {states.map((stateObj, index) => (
                        <option key={index} value={stateObj.name}>
                          {stateObj.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="city" className="block text-lg text-left">City</label>
                    <select
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      disabled={!state}
                      required
                    >
                      {cities.map((cityName, index) => (
                        <option key={index} value={cityName}>
                          {cityName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-lg text-left">Address</label>
                    <input
                      type="text"
                      id="address"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="pincode" className="block text-lg text-left">Pincode</label>
                    <input
                      type="text"
                      id="pincode"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block text-lg text-left">Description</label>
                    <textarea
                      id="description"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="text-center">
                    {selectedItem === 'Money' ? (
                      <Link to="/donate">
                        <button
                          type="button"
                          className="text-white bg-[#FCA311] px-10 py-2 rounded-md shadow-gray-600 shadow-lg"
                        >
                          Donate Money
                        </button>
                      </Link>
                    ) : (
                      <button
                        type="submit"
                        className="text-white bg-[#FCA311] px-10 py-2 rounded-md shadow-gray-600 shadow-lg"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                  <button
                    className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-gray-900 bg-white p-2 rounded-full"
                    onClick={() => setIsFormVisible(false)}
                  >
                    ×
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DonateNow;