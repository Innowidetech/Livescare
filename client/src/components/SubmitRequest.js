import React, { useState } from 'react';

const SubmitRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    itemName: '',
    mobileNumber: '',
    email: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [formOpacity, setFormOpacity] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsMessageVisible(true);
    setFormOpacity(0.5);

    try {
      const response = await fetch('https://livescare.onrender.com/api/user/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // alert('Your request has been submitted!');
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting request. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center relative min-h-screen">
      {/* Orange Container with Centered Heading */}
      <div className="bg-[#FFBA48] w-full h-auto p-8 text-center flex flex-col justify-between">
        <h1 className="text-black font-bold text-3xl mb-5 mt-14">Submit Your Request</h1>
        <p className="text-lg text-black mb-24">Make The Future Better By Your Donations Today</p>

        {/* Image Container at Bottom */}
        <div className="flex justify-center gap-0 mt-auto sm:gap-4 md:gap-14">
          <img className="w-20 h-20 sm:w-14 sm:h-24 md:w-28 md:h-24 object-cover rounded-lg" src="Assets/teddy.png" alt="image1" />
          <img className="w-20 h-20 sm:w-14 sm:h-24 md:w-28 md:h-24 object-cover rounded-lg" src="Assets/donationbox.png" alt="image2" />
          <img className="w-20 h-20 sm:w-14 sm:h-24 md:w-28 md:h-24 object-cover rounded-lg" src="Assets/singlehand.png" alt="image3" />
          <img className="w-20 h-20 sm:w-14 sm:h-24 md:w-28 md:h-24 object-cover rounded-lg" src="Assets/doublehand.png" alt="image4" />
        </div>
      </div>

      <div className="bg-[#F7F7F7] p-8 mt-8 w-full max-w-5xl mx-auto pb-4">
    <form
      className="flex flex-col gap-8 transition-opacity duration-500"
      onSubmit={handleSubmit}
      style={{ opacity: formOpacity }}
    >
      {/* Left Column */}
      <div className="space-y-6 w-full">
        <div>
          <label htmlFor="name" className="font-semibold">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          />
        </div>

        <div>
          <label htmlFor="mobileNumber" className="font-semibold">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
            pattern="^\d{10}$"
            title="Phone number must be 10 digits"
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          />
        </div>

        <div>
          <label htmlFor="state" className="font-semibold">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          />
        </div>

        <div>
          <label htmlFor="address" className="font-semibold">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          ></textarea>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6 w-full">
        <div>
          <label htmlFor="itemName" className="font-semibold">Item Name</label>
          <select
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          >
            <option value="">Select an item</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Books">Books</option>
            <option value="Medical">Medical</option>
            <option value="Toys">Toys</option>
            <option value="Games Kit">Games Kit</option>
            <option value="Money">Money</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label htmlFor="email" className="font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          />
        </div>

        <div>
          <label htmlFor="city" className="font-semibold">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          />
        </div>

        <div>
          <label htmlFor="pincode" className="font-semibold">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            required
            pattern="^\d{6}$"
            title="Please enter a valid 6-digit pincode"
            className="p-3 border border-gray-300 rounded-md text-lg w-full"
          />
        </div>
      </div>

      {/* Full-width Section */}
      <div className="w-full mt-8">
        <label htmlFor="description" className="font-semibold">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="p-3 border border-gray-300 rounded-md text-lg w-full"
        ></textarea>

        <div className="w-full flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#FFBA48] text-white py-4 px-6 text-xl font-semibold rounded-md hover:bg-orange-600 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </form>

    {/* Success Message */}
    {isMessageVisible && (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800">
        <div className="text-center p-4 bg-[#ffffff] border-2 border-green-400 flex items-center justify-between rounded-md w-11/12 sm:w-1/2 lg:w-1/3">
          <span className="text-green-500 text-2xl">&#10003;</span>
          <h2 className="text-xl font-semibold text-black ml-2">Your request has been submitted!</h2>
          <button
            className="text-xl text-gray-600 hover:text-gray-800"
            onClick={() => setIsMessageVisible(false)}
          >
            &#10005;
          </button>
        </div>
      </div>
    )}
  </div>
    </div>
  );
};

export default SubmitRequest;