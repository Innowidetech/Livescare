import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating the password reset process
    if (email) {
      setMessage('A password reset link has been sent to your email.');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center  p-4">
      <div className="w-full max-w-lg bg-white p-6 ">

        <h2 className="text-3xl font-semibold text-center mb-10">Forgot Password</h2>
        <p className='text-center mb-10'>Enter your email for the verification proccess,we will send 6 digits code to<span className='text-center'> your email</span> </p>
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
            <p className="text-center text-green-500 mt-2">{message}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-[#FCA311] text-white rounded-3xl hover:bg-orange-600 transition mt-4"
          >
            Continue
          </button>
        </form>

        <div className="mt-4 text-center text-gray-700">
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;