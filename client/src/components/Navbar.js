import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-transparent md:bg-[#14213D] text-white font-semibold shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/Assets/logo.png" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 font-semibold"> {/* Increased space-x-6 to space-x-10 */}
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/about-us" className="hover:text-blue-400">About Us</Link>
          <Link to="/submit-request" className="hover:text-blue-400">Submit Request</Link>
          <Link to="/blog" className="hover:text-blue-400">Blog</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        </div>

        {/* Desktop Button Group (Login and Donate Now) */}
        <div className="hidden md:flex space-x-4"> {/* Added space-x-4 for horizontal spacing */}
          <Link to="/login">
            <button className="bg-white px-6 py-2 rounded-lg text-right text-[#588157] font-semibold hover:bg-blue-500 transition">
              Login
            </button>
          </Link>
          <Link to="/donate">
            <button className="border border-white px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-500 transition">
              Donate Now
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
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
        <div className="md:hidden bg-transparent text-white px-4 py-3 space-y-6"> {/* Transparent background for mobile */}
          <Link to="/" className="block hover:text-blue-400 text-black">Home</Link>
          <Link to="/about-us" className="block hover:text-blue-400 text-black">About Us</Link>
          <Link to="/submit-request" className="block hover:text-blue-400 text-black">Submit Request</Link>
          <Link to="/blog" className="block hover:text-blue-400 text-black">Blog</Link>
          <Link to="/contact" className="block hover:text-blue-400 text-black">Contact</Link>

          {/* Mobile Login Button */}
          <Link to="/login">
            <button className="w-full bg-white border border-black px-4 py-2 rounded-full text-black hover:bg-blue-500 transition">
              Login
            </button>
          </Link>

          {/* Mobile Donate Now Button */}
          <Link to="/donate">
            <button className="w-full border border-black mt-2 px-4 py-2 rounded-full text-black hover:bg-green-500 transition">
              Donate Now
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;