import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Reset the message before starting the request

    if (!email) {
      setMessage('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://livescare.onrender.com/api/auth/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'A 6-digit OTP has been sent to your email.');

        // Navigate to the verification page after showing the message
        setTimeout(() => {
          navigate('/verification'); // Redirect to the verification page using navigate
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        setMessage(data.message || 'There was an issue processing your request.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center p-4">
      <div className="w-full max-w-lg bg-white p-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Forgot Password</h2>
        <p className="text-center mb-10">
          Enter your email for the verification process, we will send a 6-digit code to
          <span className="text-center"> your email</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black font-semibold mb-3">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border border-orange-400 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {message && (
            <p className={`text-center mt-2 ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-[#FCA311] text-white rounded-3xl hover:bg-orange-600 transition mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
