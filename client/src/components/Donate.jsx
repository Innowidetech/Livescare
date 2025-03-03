import React from 'react';
import { Link } from 'react-router-dom';
const Donate = () => {
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
  {/* Button 1: Donate Money */}
  <Link to="/onlinedonation" className="w-full text-center">
    <button className="w-full sm:w-2/3 lg:w-1/1 text-[#FCA311] py-6 border border-[#FCA311] text-3xl hover:bg-[#FCA311] hover:text-white transition duration-300 font-bold">
      Online Cash Payment
    </button>
  </Link>
  {/* Button 2: Donate Goods */}
  <Link to="/donation-form" className="w-full text-center">
    <button className="w-full sm:w-2/3 lg:w-1/1 text-[#FCA311] border border-[#FCA311] py-6 text-3xl hover:bg-[#FCA311] hover:text-white transition duration-300 font-bold">
      Offline Cash Payment
    </button>
  </Link>
</div>
</div>
  );
};

export default Donate;
