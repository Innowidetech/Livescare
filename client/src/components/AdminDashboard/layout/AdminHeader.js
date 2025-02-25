import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../redux/adminprofile";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.adminProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 opacity-100 md:backdrop-blur-xl bg-white  text-gray-800 p-4 flex items-center flex-wrap md:flex-nowrap md:pl-64 -mt-10 md:-mt-0">
      <div className="md:hidden flex items-center mt-8 ml-8">
        <img
          src="/Assets/logo1.png"
          alt="Logo"
          className="h-10"
          onClick={() => navigate("/admin")}
        />
      </div>

      {/* Left Side for Desktop (Search Bar) */}
      <div className="hidden md:flex items-center bg-gray-200 p-3 rounded-3xl mb-4 md:mb-0 md:ml-10">
        <i className="fas fa-search text-gray-600 mr-2"></i>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none text-gray-600 placeholder-gray-600 lg:w-[300px]"
        />
      </div>

      {/* Right Side: Profile Button for Mobile and Desktop */}
      <div className="flex items-center ml-auto">
        {/* Mobile: Search Icon and Profile Button */}
        <div className="md:hidden flex items-center mr-4">
          <i className="fas fa-search text-gray-600"></i>
        </div>

        {/* Desktop: Profile Button */}
        <div className="flex items-center ml-4">
          <button
            onClick={handleProfileClick}
            className="text-gray-600 px-4 py-2 mt-8 md:mt-0 rounded-lg flex items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <FaRegUserCircle className="text-xs md:text-lg" />
            <span className="inline-block text-xs md:text-lg">
              {profile?.loggedinuser?.fullname}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
