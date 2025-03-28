import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { registerUser } from '../../redux/RegisterationSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loginimg from '../../Assets/Loginimg.png';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationState = useSelector((state) => state.registration);
  const { loading } = registrationState || { loading: false };
  
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullname || !formData.username || !formData.email || 
        !formData.mobileNumber || !formData.password || !formData.pincode) {
      toast.error('Please fill in all fields', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address', {
        position: "top-center",
        autoClose: 3000
      });
      return;
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number', {
        position: "top-center",
        autoClose: 3000
      });
      return;
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit pincode', {
        position: "top-center",
        autoClose: 3000
      });
      return;
    }
    
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      toast.success('Registration successful! Please login to continue', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          // Navigate to login page after toast closes
          navigate('/login');
        }
      });
      
      // Reset form
      setFormData({
        fullname: '',
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        pincode: '',
      });
    } catch (error) {
      toast.error(error?.message || 'Registration failed. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ToastContainer />
      {/* Left side with registration form */}
      <div className="w-full md:w-1/1 flex justify-center items-center bg-white p-4 md:p-0">
        <div className="w-full max-w-md p-6">
          <h2 className="text-3xl font-semibold text-center mb-2">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-2 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your Username"
                className="w-full p-2 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter your Mobile Number"
                className="w-full p-2 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 rounded-3xl border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Pincode</label>
              <input
                type="tel"
                id="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter your Pincode Number"
                className="w-full p-2 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#FCA311] text-white rounded-3xl hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center text-gray-700">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-black font-semibold hover:text-blue-400">
                Login
              </Link>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="mt-6 flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" className="text-[#FCA311] hover:text-blue-600 transition" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" className="text-[#FCA311] hover:text-green-400 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" className="text-[#FCA311] hover:text-blue-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-[#FCA311] hover:text-blue-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Right side with orange background and image */}
      <div className="w-full md:w-1/2 bg-[#FCA311] relative flex justify-center items-end">
        <img
          src={Loginimg}
          alt="Background"
          className="w-full object-cover mr-44"
        />
      </div>
    </div>
  );
};

export default RegistrationRequest;