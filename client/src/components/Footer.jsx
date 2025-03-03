import React from "react";
import { Link } from "react-router-dom";
import Company from "../Assets/logo1.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <img src={Company} alt="Company Logo" className="w-32 h-16 " />

          <p className="text-gray-400">
            We are a dynamic company committed to delivering exceptional
            service. Our team values creativity and innovation, and we strive to
            build lasting relationships with our clients and partners.
          </p>
        </div>

        {/* Column 2 (Home Section) */}
        <div className="ml-0 sm:ml-8">
          {" "}
          {/* Add margin-left here for larger screens */}
          <h4 className="text-lg font-semibold mb-4">Home</h4>
          <ul className="space-y-3">
            {" "}
            {/* Added space between list items */}
            <li>
              <Link to="/about-us" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/Blog" className="text-gray-400 hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/donatenow" className="text-gray-400 hover:text-white">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-3">
            <li>
              <a href="/Facebook" className="text-gray-400 hover:text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="/Instagram" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="/Twitter" className="text-gray-400 hover:text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="/LinkdIn" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="mr-10 sm:mr-10 md:mr-20">
          <h4 className="text-2xl font-bold mb-4">
            Subscribe to get latest updates
          </h4>
          <div className="mt-8">
            <div className="flex items-center ">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2  text-white bg-[#14213D] focus:outline-none border border-white"
              />
              <button className="bg-white text-black py-2 px-2 hover:bg-blue-600 border border-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
    </footer>
  );
};

export default Footer;
