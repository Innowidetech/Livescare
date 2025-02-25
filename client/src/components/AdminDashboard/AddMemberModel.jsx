import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { registerMember, resetRegistrationStatus } from '../../redux/memberSlice';

const AddMemberModal = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { registrationStatus, registrationError } = useSelector((state) => state.member);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    designation: '',
    mobileNumber: '',
    pincode: '',
  });

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullname: '',
        username: '',
        email: '',
        password: '',
        designation: '',
        mobileNumber: '',
        pincode: '',
      });
      dispatch(resetRegistrationStatus());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (registrationStatus?.status === 201) {
      toast.success('Member added successfully!');
      onSuccess?.();
      onClose();
      dispatch(resetRegistrationStatus());
    }

    if (registrationError) {
      toast.error(registrationError || 'Failed to add member');
      dispatch(resetRegistrationStatus());
    }
  }, [registrationStatus, registrationError, dispatch, onSuccess, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerMember(formData));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-xl relative">
        <div className="flex justify-between items-center p-6">
          <h2 className="text-xl font-medium" style={{fontFamily: 'Inter'}}>Add New Member</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-auto">
          <div>
            <label className="block text-lg text-[#000000] mb-1">
              Full name:
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#fca311] rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-[#000000] mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#fca311] rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-[#000000] mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#fca311] rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-[#000000] mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#fca311] rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-[#000000] mb-1">
              Designation:
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#fca311] rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-[#000000] mb-1">
              Mobile Number:
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#fca311] rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg text-[#000000] mb-1">
              Pincode:
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#fca311] rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={registrationStatus === 'loading'}
            className="w-full bg-[#FF9500] text-white py-2 rounded-lg hover:bg-[#e68600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registrationStatus === 'loading' ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;