import React, { useState, useEffect } from "react";
import { Download, Search, ChevronDown, Filter, Trash2, Pencil, Eye, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCertificates, deleteCertificate, updateCertificateStatus, updateCertificate } from "../../redux/member/memberCertificate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfile } from "../../redux/member/memberProfile";

function MemberCertificate() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [donorId, setDonorId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [editFormData, setEditFormData] = useState({
    issuedTo: "",
    relation: "",
    deliveredDate: "",
    status: ""
  });

  const dispatch = useDispatch();
  const { certificates, loading } = useSelector((state) => state.certificates);
  const { profile } = useSelector((state) => state.memberProfile);

  useEffect(() => {
    dispatch(fetchCertificates());
    dispatch(getProfile());
  }, [dispatch]);

  // Add date validation helper function
  const isValidDate = (date) => {
    return date && !isNaN(new Date(date).getTime());
  };

  // Add safe date formatting function
  const formatDate = (date) => {
    if (!isValidDate(date)) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  const handleEdit = (e, certificate) => {
    e.stopPropagation();
    setSelectedCertificate(certificate);
    
    // Add date validation when setting the form data
    const deliveredDate = certificate.deliveredDate ? new Date(certificate.deliveredDate) : "";
    // Check if the date is valid before setting it
    const isValidDate = deliveredDate && !isNaN(deliveredDate.getTime());
    
    setEditFormData({
      issuedTo: certificate.issuedTo || "",
      relation: certificate.relation || "",
      deliveredDate: isValidDate ? deliveredDate : "",
      status: certificate.status || ""
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCertificate({
        certificateId: selectedCertificate._id,
        updateData: editFormData
      })).unwrap();
      
      toast.success('Certificate updated successfully', {
        position: "top-right",
        autoClose: 3000
      });
      setShowEditModal(false);
      dispatch(fetchCertificates());
    } catch (error) {
      toast.error(error.message || 'Failed to update certificate', {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  const handleView = (e, certificate) => {
    e.stopPropagation();
    navigate(`/member/membercertificate/${certificate._id}`, { state: { certificate } });
  };

  const handleDownload = (e, certificate) => {
    e.stopPropagation();
    toast.info('Download functionality will be implemented', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleStatusUpdate = async (certificateId, newStatus) => {
    try {
      await dispatch(updateCertificateStatus({ certificateId, newStatus })).unwrap();
      setEditingStatus(null);
      await dispatch(fetchCertificates());
      toast.success('Status updated successfully', {
        position: "top-right",
        autoClose: 3000
      });
    } catch (error) {
      toast.error(error.message || 'Failed to update status', {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  // Get unique statuses from certificates data
  const uniqueStatuses = certificates?.certificates
    ? [...new Set(certificates.certificates.map((cert) => cert.status))]
    : [];

  // Get unique donation IDs from certificates data
  const uniqueDonationIds = certificates?.certificates
    ? [...new Set(certificates.certificates.map((cert) => cert.donationId._id))]
    : [];

  // Filter certificates based on selected filters
  const filteredCertificates = certificates?.certificates?.filter((cert) => {
    const dateMatch = selectedDate
      ? new Date(cert.issuedDate).toDateString() === selectedDate.toDateString()
      : true;
    const idMatch = donorId ? cert.donationId._id === donorId : true;
    const statusMatch = selectedStatus ? cert.status === selectedStatus : true;
    return dateMatch && idMatch && statusMatch;
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClearFilters = () => {
    setSelectedDate(null);
    setDonorId("");
    setSelectedStatus("");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const StatusCell = ({ cert }) => {
    const isEditing = editingStatus === cert._id;
    
    return (
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <select
            value={cert.status}
            onChange={(e) => handleStatusUpdate(cert._id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="px-2 py-1 border rounded-md text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
          </select>
        ) : (
          <>
            <span
              className={`px-2 inline-flex text-md leading-5 font-semibold rounded-full ${
                cert.status === "Received"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {cert.status}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingStatus(cert._id);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Pencil className="w-4 h-4 text-gray-500" />
            </button>
          </>
        )}
      </div>
    );
  };

  const ActionButtons = ({ cert }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={(e) => handleView(e, cert)}
        className="p-1 hover:bg-gray-100 rounded-full text-blue-600"
        title="View Certificate"
      >
        <Eye className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => handleEdit(e, cert)}
        className="p-1 hover:bg-gray-100 rounded-full text-green-600"
        title="Edit Certificate"
      >
        <Pencil className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <>
      <div className="min-h-screen">
        <ToastContainer />
        <div className="sm:px-6 lg:px-8 py-6 mt-12 md:mt-10">
          {/* Header with title and filter toggle */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl mb-2 font-medium text-left" style={{fontFamily:'Inter'}}>Hi,<span className=""> {profile?.loggedinuser?.fullname} </span></h2>
            <h1 className="md:text-2xl font-medium text-[#202224]" style={{fontFamily:'Inter'}}>
              Certificates
            </h1>
            <button
              onClick={toggleFilters}
              className="md:hidden flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Edit Certificate</h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleEditSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issued To</label>
                      <input
                        type="text"
                        value={editFormData.issuedTo}
                        onChange={(e) => setEditFormData({...editFormData, issuedTo: e.target.value})}
                        className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Relation</label>
                      <input
                        type="text"
                        value={editFormData.relation}
                        onChange={(e) => setEditFormData({...editFormData, relation: e.target.value})}
                        className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Delivered Date</label>
                      <DatePicker
                        selected={editFormData.deliveredDate}
                        onChange={(date) => setEditFormData({...editFormData, deliveredDate: date})}
                        className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={editFormData.status}
                        onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                        className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Received">Received</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FCA311] text-white rounded-md text-sm font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Filters - Always visible on MD and up, toggleable on mobile */}
          <div className={`${showFilters ? "block" : "hidden"} md:block mb-6`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date Picker */}
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  isClearable
                  placeholderText="Select date"
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {/* Donation ID Select */}
              <div className="relative">
                <select
                  value={donorId}
                  onChange={(e) => setDonorId(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Donation ID</option>
                  {uniqueDonationIds.map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
                </select>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              {/* Status Select */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  <option value="">Status</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              {/* Clear Filters Button */}
              {(selectedDate || donorId || selectedStatus) && (
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none bg-white border border-blue-600 rounded-md"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {loading ? (
              <div className="text-center py-4 text-gray-500">
                Loading certificates...
              </div>
            ) : filteredCertificates?.length > 0 ? (
              filteredCertificates.map((cert) => (
                <div 
                  key={cert._id} 
                  className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="space-y-2">
                    <div className="grid">
                      <div className="flex items-center justify-between" style={{fontFamily:'Inter'}}>
                        <h1 className="text-left text-[#202224] text-sm">
                          Name
                        </h1>
                        <h3 className="py-4 text-[#202224] text-xs">
                          {cert.donorName}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left text-[#202224] text-sm">
                          Donation ID
                        </h1>
                        <h1 className="py-4 text-[#202224] text-xs">
                          {cert.donationId._id}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left text-[#202224] text-sm">
                          Issue Date
                        </h1>
                        <h1 className="py-4 text-[#202224] text-xs">
                          {formatDate(cert.createdAt)}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left text-[#202224] text-sm">
                          Status
                        </h1>
                        <div className="py-4">
                          {cert.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <h1 className="text-left text-[#202224] text-sm">
                          Action
                        </h1>
                        <div className="py-4">
                          <ActionButtons cert={cert} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No certificates found
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden mx-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#F1F4F9]">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-lg font-medium text-[#202224]"
                    style={{ fontFamily: "Inter" }}
                  >
                    Donor Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-lg font-medium text-[#202224]"
                    style={{ fontFamily: "Inter" }}
                  >
                    Donation ID
                  </th>
                  <th
                    className="px-6 py-3 text-left text-lg font-medium text-[#202224]"
                    style={{ fontFamily: "Inter" }}
                  >
                    Issued Date
                  </th>
                  <th
                    className="px-6 py-3 text-left text-lg font-medium text-[#202224]"
                    style={{ fontFamily: "Inter" }}
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-left text-lg font-medium text-[#202224]"
                    style={{ fontFamily: "Inter" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading certificates...
                    </td>
                  </tr>
                ) : filteredCertificates?.length > 0 ? (
                  filteredCertificates.map((cert) => (
                    <tr 
                      key={cert._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4" style={{fontFamily:'Inter'}}>
                        <div className="text-md text-gray-900">
                          {cert.donorName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-md text-gray-900">
                          {cert.donationId._id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[#202224] text-md">
                          {formatDate(cert.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {cert.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ActionButtons cert={cert} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No certificates found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberCertificate;