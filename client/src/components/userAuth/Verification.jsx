import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate(); // Hook to navigate to a different route
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state for showing success message

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => setOtp(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Submit Email to send OTP (simulating in your case)
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (email) {
      setMessage('A 6-digit OTP has been sent to your email.');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  // Submit OTP for verification
  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Reset message before sending request

    if (!otp || !email) {
      setMessage('Please enter both email and OTP.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://livescare.onrender.com/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP verified successfully. Please enter your new password.');
      } else {
        setMessage(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }

    setIsLoading(false);
  };

  // Submit new password and confirm password
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Reset message before sending request

    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in both password fields.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://livescare.onrender.com/api/auth/resetPassword', {
        method: 'PATCH', // Assuming this is a PATCH method to update the password
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Your password has been successfully reset.');
        setShowModal(true); // Show success modal
        setTimeout(() => {
          navigate('/password-updated'); // Navigate to the success page after a short delay
        }, 2000); // Delay of 2 seconds before navigation
      } else {
        setMessage(data.message || 'There was an issue updating your password.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }

    setIsLoading(false);
  };

  // Modal for password reset success
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-3xl w-96">
        <h2 className="text-2xl font-semibold text-center">Password Updated Successfully!</h2>
        <p className="text-center mt-4">Your password has been updated. You can now log in with your new password.</p>
        <div className="mt-4 text-center">
          <button
            className="py-2 px-6 bg-[#FCA311] text-white rounded-3xl hover:bg-orange-600 transition"
            onClick={() => setShowModal(false)} // Close the modal
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen justify-center items-center p-4 mt-6">
      <div className="w-full max-w-lg bg-white p-6">
        <h2 className="text-3xl font-semibold text-center mb-2">Verification</h2>
        <h2 className="text-base text-center mb-2">Enter your 6-digit code that you received on your email.</h2>

        {/* Email Step */}
        <form onSubmit={handleSubmitEmail}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </form>

        {/* OTP Step */}
        <form onSubmit={handleSubmitOtp}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-semibold">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-3 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </form>

        {/* Password Reset Step */}
        <form onSubmit={handleSubmitPassword}>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-gray-700 font-semibold">New Password:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="w-full p-3 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {message && <p className="text-center text-green-500 mt-2">{message}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-[#FCA311] text-white rounded-3xl hover:bg-orange-600 transition mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting Password...' : 'Update Password'}
          </button>
        </form>

        {/* Resend OTP Link */}
        <div className="mt-4 text-center text-gray-700">
          <p>
            If you didn’t receive a code,{' '}
            <a
              href="#"
              className="text-[#FCA311] font-semibold hover:text-orange-600 transition"
              onClick={(e) => {
                e.preventDefault();
                setMessage('A new OTP has been sent to your email.');
              }}
            >
              Resend
            </a>
          </p>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {showModal && <SuccessModal />}
    </div>
  );
};

export default Verification;
