import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LayoutDashboard, Settings, FileText, UserPlus, Users, CreditCard, History, Award, Menu, X } from 'lucide-react';
import { CiLogout } from "react-icons/ci";
import { logoutUser } from '../../../redux/LoginSlice';
import { FaEdit } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'inventory', icon: Settings, label: 'Inventory' },
  { id: 'submit-request', icon: FileText, label: 'Submit Request' },
  { id: 'doner-request', icon: UserPlus, label: 'Donar Request' },
  { id: 'members', icon: Users, label: 'Members' },
  { id: 'accounts', icon: CreditCard, label: 'Accounts' },
  { id: 'submit-history', icon: History, label: 'Submit Request History'},
  { id: 'Donor-history', icon: History, label: 'Donor Request History' },
  { id: 'certificate', icon: Award, label: 'Certificate' },
  { id: 'blog', icon: FaEdit, label: 'Blog' },
  { id: 'program', icon: CiCircleList, label: 'Program' },

];

const AdminSidebar = ({ setActiveTab, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkExpiration = setInterval(() => {
  //     if (checkTokenExpiration()) {
  //       handleLogout();
  //     }
  //   }, 60000);

  //   return () => clearInterval(checkExpiration);
  // }, []);

  const handleMenuItemClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 p-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 hover:text-[#FCA311] focus:outline-none transition-colors duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#FCA311] text-white flex flex-col transition-all duration-300 ease-in-out transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 z-40 shadow-lg`}
      >
        {/* Logo/Title */}
        <div className="px-6 py-6">
        <div className="flex items-center justify-center">
          <img src="/Assets/logo1.png" alt="Logo" className="h-20 w-20" />
        </div>
         
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow overflow-y-scroll scrollbar-hidden px-4 py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`flex items-center w-full p-3 rounded-lg mb-2  transition-all duration-200 text-left 
                  ${activeTab === item.id
                    ? 'bg-white text-[#FCA311] shadow-md'
                    : 'hover:bg-white/10'
                  }`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                <Icon size={20} className="min-w-[20px]" />
                <span className="ml-3 text-lg" style={{fontFamily:'Inter'}}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 flex justify-center">
          <button
            className="flex items-center justify-center p-3 text-left text-[#FCA311] w-[130px] transition-colors duration-200 bg-white rounded-full hover:bg-gray-100"
            onClick={handleLogout}
          >
            <CiLogout size={20} className="min-w-[20px]" />
            <span className="ml-3 text-md">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;