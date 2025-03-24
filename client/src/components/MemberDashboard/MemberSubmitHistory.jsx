import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchMemberSubmitRequests,
  setSelectedView,
  updateMemberRequestStatus, } from '../../redux/member/memberSubmitSlice';
import { ChevronDown, X, Pencil, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {getProfile} from  '../../redux/member/memberProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DescriptionModal({ isOpen, onClose, description }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg md:text-xl font-medium text-[#14213D]" style={{fontFamily:'Inter'}}>Description</h3>
          <button
            onClick={onClose}
            className="text-[#808080] hover:text-[#202224] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-[#000000] text-lg">
          {description || 'No description available'}
        </div>
      </div>
    </div>
  );
}

function StatusDropdown({ currentStatus, onStatusChange, align = 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    // { value: 'Rejected', label: 'Rejected' },
    // { value: 'Completed', label: 'Completed' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex items-center gap-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <Pencil className="w-4 h-4" />
      </button>
      {isOpen && (
        <div 
          className={`absolute z-20 mt-1 ${align === 'right' ? 'right-0' : 'left-0'} bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]`}
        >
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => {
                onStatusChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterDropdown({ options, value, onChange, align = 'left', isDate = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isDate) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2 p-2 md:gap-2 md:px-4 md:py-2 text-[#808080] border border-[#E5E5E5] rounded-lg text-xs md:text-lg calendar">
          <DatePicker
            selected={value}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            className="bg-transparent outline-none cursor-pointer"
            placeholderText="Select date"
          />
          <Calendar className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 md:gap-2 md:px-4 md:py-2 text-[#808080] border border-[#E5E5E5] rounded-lg text-xs md:text-lg"
      >
        <span>{value}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div 
          className={`absolute z-10 mt-1 ${align === 'right' ? 'right-0' : 'left-0'} bg-white -ml-20 md:-ml-0 border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DropdownMenu({ options, value, onChange, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-[#202224] hover:text-[#14213D] transition-colors"
      >
        {value} <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div 
          className={`absolute z-10 mt-1 ${align === 'right' ? 'right-0' : 'left-0'} bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MemberSubmitHistory() {
  const dispatch = useDispatch();
  const { requests, status, error, selectedView } = useSelector(
    (state) => state.memberSubmit
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);

  const itemTypeOptions = [
    { value: "All", label: "All Items" },
    { value: "Food", label: "Food" },
    { value: "Clothes", label: "Clothes" },
    { value: "Books", label: "Books" },
    { value: "Medical", label: "Medical" },
    { value: "Toys", label: "Toys" },
    { value: "Games Kit", label: "Games Kit" },
    { value: "Money", label: "Money" },
    { value: "Others", label: "Others" }
  ];

  const statusOptions = [
    { value: "All", label: "All Status" },
    // { value: "Pending", label: "Pending" },
    // { value: "Processing", label: "Processing" },
    { value: "Rejected", label: "Rejected" },
    { value: "Completed", label: "Completed" }
  ];

  const locationOptions = [
    { value: "city", label: "City" },
    { value: "state", label: "State" },
    { value: "address", label: "Address" },
    { value: "pincode", label: "Pincode" },
  ];

  const contactOptions = [
    { value: "mobileNumber", label: "Phone Number" },
    { value: "email", label: "Email" },
  ];

  useEffect(() => {
    dispatch(
      fetchMemberSubmitRequests({
        location: selectedView.location,
        contact: selectedView.contact,
      })
    );
  }, [dispatch, selectedView]);
  const { profile } = useSelector((state) => state.memberProfile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);



  useEffect(() => {
    if (requests?.submits) {
      let filtered = [...requests.submits];

      // Apply date filter
      if (selectedDate) {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.createdAt).setHours(0, 0, 0, 0);
          const filterDate = new Date(selectedDate).setHours(0, 0, 0, 0);
          return itemDate === filterDate;
        });
      }

      // Apply item type filter
      if (selectedItemType && selectedItemType !== "All") {
        filtered = filtered.filter(item => 
          item.itemName === selectedItemType
        );
      }

      // Apply status filter
      if (selectedStatus && selectedStatus !== "All") {
        filtered = filtered.filter(item => 
          item.status === selectedStatus
        );
      }

      setFilteredRequests(filtered);
    }
  }, [requests?.submits, selectedDate, selectedItemType, selectedStatus]);

  const handleLocationChange = (value) => {
    dispatch(setSelectedView({ location: value }));
  };

  const handleContactChange = (value) => {
    dispatch(setSelectedView({ contact: value }));
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await dispatch(updateMemberRequestStatus({ requestId, newStatus })).unwrap();
      toast.success(`Status updated to ${newStatus} successfully`);
    } catch (error) {
      toast.error( error);
    }
  };

  const handleOpenModal = (description) => {
    setSelectedDescription(description);
    setModalOpen(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
      case "completed":
        return "bg-[#00BA34] text-white";
      case "rejected":
        return "bg-[#FF0000] text-white";
      case "pending":
        return "bg-[#A8ABAD] text-white";
      default:
        return "bg-[#FCA311] text-white";
    }
  };

  const getLocationValue = (item) => {
    return item[selectedView.location] || "N/A";
  };

  const getContactValue = (item) => {
    return item[selectedView.contact] || "N/A";
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          Error: {error || "Failed to load data"}
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen p-4 md:mt-12 mt-10">
        <div className="py-8 mt-10 md:mt-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
              <h2 className="text-3xl sm:text-2xl mb-2 font-medium text-left" style={{fontFamily:'Inter'}}>
                Hi,<span className=""> {profile?.loggedinuser?.fullname} </span>
              </h2>
              <h1 className="text-xl sm:text-2xl font-medium text-center sm:text-left text-[#202224]" style={{fontFamily:'Inter'}}>
                Submit Request History
              </h1>
              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                {/* <span className="text-sm text-gray-600">Total: {donors?.total || 0}</span> */}
              </div>
            </div>

            <div className="flex flex-row gap-2 md:gap-4">
              <FilterDropdown 
                isDate={true}
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                }}  
              />
              <div className="">
                <FilterDropdown
                  options={itemTypeOptions}
                  value={selectedItemType}
                  onChange={(type) => {
                    setSelectedItemType(type);
                  }}
                />
              </div>
              <div className="">
                <FilterDropdown
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={(status) => {
                    setSelectedStatus(status);
                  }}
                />
              </div>
            </div>

            <div className="hidden lg:block rounded-xl shadow overflow-x-scroll hide-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-[#F1F4F9]" style={{fontFamily:'Inter'}}>
                    <th className="px-6 py-4 text-left font-medium text-[#202224]">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-[#202224]">
                      Item Name
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-[#202224]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-[#202224]">
                      <DropdownMenu
                        options={locationOptions}
                        value={
                          selectedView.location.charAt(0).toUpperCase() +
                          selectedView.location.slice(1)
                        }
                        onChange={handleLocationChange}
                      />
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-[#202224]">
                      <DropdownMenu
                        options={contactOptions}
                        value={
                          selectedView.contact === "mobileNumber"
                            ? "Phone Number"
                            : "Email"
                        }
                        onChange={handleContactChange}
                      />
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-[#202224]">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left font-medium text-[#202224]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.filter((item) => item.status !== "Pending").map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4 text-[#202224]">{item.name}</td>
                      <td className="px-6 py-4 text-[#202224]">
                        {item.itemName}
                      </td>
                      <td className="px-6 py-4 text-[#202224]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-[#202224]">
                        {getLocationValue(item)}
                      </td>
                      <td className="px-6 py-4 text-[#202224]">
                        {getContactValue(item)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleOpenModal(item.description)}
                          className="bg-[#FCA311] text-sm py-2 px-3 rounded-lg transition-colors text-white"
                        >
                          Message
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 font-medium rounded-lg w-[100px] ${getStatusBadgeClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                          <StatusDropdown
                            currentStatus={item.status}
                            onStatusChange={(newStatus) =>
                              handleStatusChange(item.id, newStatus)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-4">
              {filteredRequests.filter((item) => item.status !== "Pending").map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FCFDFD] rounded-xl p-4 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="grid">
                      <div className="flex items-center justify-between" style={{fontFamily:'Inter'}}>
                        <h1 className="text-left font-medium text-[#202224] text-sm">
                          Name
                        </h1>
                        <h1 className="py-4 text-[#202224]">{item.name}</h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left font-medium text-[#202224] text-sm">
                          Item Name
                        </h1>
                        <h1 className="py-4 text-[#202224]">{item.itemName}</h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left font-medium text-[#202224] text-sm">
                          Date
                        </h1>
                        <h1 className="py-4 text-[#202224]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left font-medium text-[#202224] text-sm">
                          <DropdownMenu
                            options={locationOptions}
                            value={
                              selectedView.location.charAt(0).toUpperCase() +
                              selectedView.location.slice(1)
                            }
                            onChange={handleLocationChange}
                            align="right"
                          />
                        </h1>
                        <h1 className="py-4 text-[#202224]">
                          {getLocationValue(item)}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left font-medium text-[#202224] text-sm">
                          <DropdownMenu
                            options={contactOptions}
                            value={
                              selectedView.contact === "mobileNumber"
                                ? "Phone Number"
                                : "Email"
                            }
                            onChange={handleContactChange}
                            align="right"
                          />
                        </h1>
                        <h1 className="py-4 text-[#202224]">
                          {getContactValue(item)}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left font-medium text-[#202224] text-sm">
                          Description
                        </h1>
                        <button
                          onClick={() => handleOpenModal(item.description)}
                          className="bg-[#FCA311] text-sm py-1 px-2 rounded-lg transition-colors text-white"
                        >
                          Message
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left font-medium text-[#202224] text-sm">
                          Status
                        </h1>
                        <div className="flex items-center gap-2 pt-4 justify-between">
                          <span
                            className={`px-3 py-1 font-medium rounded-lg w-[100px] ${getStatusBadgeClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                          <StatusDropdown
                            currentStatus={item.status}
                            onStatusChange={(newStatus) =>
                              handleStatusChange(item.id, newStatus)
                            }
                            align="right"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {(!filteredRequests || filteredRequests.length === 0) && (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-[#808080]">No requests found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DescriptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        description={selectedDescription}
      />
    </>
  );
}

export default MemberSubmitHistory;