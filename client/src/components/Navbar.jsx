import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo1 from '../Assets/logo1.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to close the mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white lg:bg-[#14213D] text-white lg:text-white font-semibold shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo1} alt="Logo" className="h-14 w-28" />
        </div>

        {/* Desktop & Tablet Menu */}
        <div className="hidden lg:flex space-x-12 font-semibold">
          <Link to="/" className="" onClick={handleLinkClick}>Home</Link>
          <Link to="/about-us" className="" onClick={handleLinkClick}>About Us</Link>
          <Link to="/submit-request" className="" onClick={handleLinkClick}>Submit Request</Link>
          <Link to="/blog" className="" onClick={handleLinkClick}>Blog</Link>
          <Link to="/contact" className="" onClick={handleLinkClick}>Contact</Link>
        </div>

        {/* Buttons: Login and Donate Now */}
        <div className="hidden lg:flex space-x-6"> {/* Added space-x-6 to create space between buttons */}
          <Link to="/login">
            <button className="bg-[#FCA311]  hover:bg-orange-600  px-6 py-2 rounded-lg text-white font-semibold  transition">
              Login
            </button>
          </Link>
          <Link to="/donatenow">
            <button className="bg-[#14213D]  hover:bg-orange-600  px-6 py-2 rounded-lg text-white font-semibold transition border-2 border-white ">
              Donate Now
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white text-[#14213D] px-4 py-3 space-y-6">
          <Link to="/" className="block" onClick={handleLinkClick}>Home</Link>
          <Link to="/about-us" className="block " onClick={handleLinkClick}>About Us</Link>
          <Link to="/submit-request" className="block " onClick={handleLinkClick}>Submit Request</Link>
          <Link to="/blog" className="block " onClick={handleLinkClick}>Blog</Link>
          <Link to="/contact" className="block " onClick={handleLinkClick}>Contact</Link>
        
          <Link to="/login">
            <button className="w-full bg-[#FCA311]  hover:bg-orange-600  px-4 py-2 rounded-full text-white transition">
              Login
            </button>
          </Link>

          <Link to="/donatenow">
            <button className="w-full bg-[#14213D] hover:bg-orange-600  px-4 py-2  rounded-full text-white  transition  border-2 border-white "  onClick={handleLinkClick} >
              
              Donate Now
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;