import React, { useState, useEffect } from "react";
import { Award, Download, Search, ChevronDown, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCertificates } from "../../redux/member/memberCertificate";
import Header from "./layout/MemberHeader";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [donorId, setDonorId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();
  const { certificates, loading } = useSelector((state) => state.certificates);

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

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

  return (
    <>
      <div>
        {/* <Header /> */}
      </div>
      <div className="min-h-screen">
        <div className="sm:px-6 lg:px-8 py-6">
          {/* Header with title and filter toggle */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 flex lg:items-center">
              <h1 className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-600" />
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

          {/* Filters - Always visible on MD and up, toggleable on mobile */}
          <div className={`${showFilters ? "block" : "hidden"} md:block mb-6`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date Picker */}
              <div className="relative flex-1">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  isClearable
                  placeholderText="Select date"
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              {/* Donation ID Select */}
              <div className="relative flex-1">
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
              <div className="relative flex-1">
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
                <div key={cert._id} className="bg-white rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="grid">
                      <div className="flex items-center justify-between">
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
                            {" "}
                            {new Date(cert.issuedDate).toLocaleDateString()}
                          </h1>
                        </div>
                        <div className="flex items-center justify-between">
                          <h1 className="text-left  text-[#202224] text-sm">
                            Status
                          </h1>
                          <button
                          className="text-[#fca311]"
                          title="Download Certificate"
                        >
                          <Download className="w-5 h-5" />
                        </button>
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
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
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
                    className="px-6 py-3 text-left text-lg  font-medium text-[#202224]"
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
                    className="px-6 py-3 text-left text-lg  font-medium text-[#202224]"
                    style={{ fontFamily: "Inter" }}
                  >
                    Status
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
                    <tr key={cert._id} >
                      <td className="px-6 py-4" style={{fontFamily:'Inter'}}>
                        <div className="text-md  text-gray-900">
                          {cert.donorName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-md  text-gray-900">
                          {cert.donationId._id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-[#202224] text-md">
                          {new Date(cert.issuedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-md leading-5 font-semibold rounded-full ${
                            cert.status === "Received"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {cert.status}
                        </span>
                        <span className="pl-6"><button
                          className="text-[#fca311]"
                          title="Download Certificate"
                        >
                          <Download className="w-5 h-5" />
                        </button></span>
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

export default App;
