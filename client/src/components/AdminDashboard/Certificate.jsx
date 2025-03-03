import React, { useState, useEffect } from "react";
import { FileImage, Plus, Award, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCertificates,
  addCertificate,
  fetchDonors,
  deleteCertificate,
} from "../../redux/certificate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfile} from "../../redux/adminprofile";

function Certificate() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("all");
  const [formData, setFormData] = useState({
    donorName: "",
    donationId: "",
    issuedDate: "",
    signature: null,
  });

  const dispatch = useDispatch();
  const { certificates, donors, loading, error, successMessage } = useSelector(
    (state) => state.certificates
  );

  useEffect(() => {
    dispatch(fetchCertificates());
    dispatch(fetchDonors());
  }, [dispatch]);
  
  const { profile } = useSelector((state) => state.adminProfile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [successMessage, error]);

  const handleDonorSelect = (e) => {
    const selectedDonor = donors.find((donor) => donor.name === e.target.value);
    if (selectedDonor) {
      setFormData((prev) => ({
        ...prev,
        donorName: selectedDonor.name,
        donationId: selectedDonor._id,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "signature" && files) {
      const formDataToSend = new FormData();
      formDataToSend.append("signature", files[0]);
      setFormData((prev) => ({ ...prev, signature: formDataToSend }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("donorName", formData.donorName);
    formDataToSend.append("donationId", formData.donationId);
    formDataToSend.append("issuedDate", formData.issuedDate);
    if (formData.signature) {
      const signatureFile = formData.signature.get("signature");
      formDataToSend.append("signature", signatureFile);
    }

    await dispatch(addCertificate(formDataToSend));

    setFormData({
      donorName: "",
      donationId: "",
      issuedDate: "",
      signature: null,
    });
    setActiveView("all");
    dispatch(fetchCertificates());
  };

  const handleDelete = async (e, certificateId) => {
    e.stopPropagation(); // Prevent navigation when clicking delete button
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await dispatch(deleteCertificate(certificateId)).unwrap();
        dispatch(fetchCertificates());
      } catch (error) {
        toast.error('Failed to delete certificate', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleCertificateClick = (certificate) => {
    navigate(`/admin/certificate/${certificate._id}`, { state: { certificate } });
  };

  const CertificateCard = ({ certificate }) => (
    <div 
      className="bg-white rounded-lg shadow-md p-2 md:p-6 mb-4 relative cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => handleCertificateClick(certificate)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm md:text-xl font-semibold text-gray-800">
            {certificate.donorName}
          </h3>
          <p className="text-xs md:text-sm text-gray-600">
            ID: {certificate.donationId._id}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            certificate.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : certificate.status === "Received"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {certificate.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-600">
            Item: {certificate.donationId.itemName}
          </p>
          <p className="text-gray-600">
            {certificate.donationId.itemName.toLowerCase() === "money"
              ? "Amount"
              : "Count"}
            :
            {certificate.donationId.itemName.toLowerCase() === "money"
              ? certificate.donationId.amount
              : certificate.donationId.count}
          </p>
          <p className="text-gray-600">
            Issued To: {certificate.donationId.itemName}
          </p>
        </div>
        <div className="hidden md:block">
          <p className="text-gray-600">
            Issued Date: {new Date(certificate.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600">Issued By: {certificate.issuedBy}</p>
          <p className="text-gray-600">
            Delivered Date: {certificate.status === "Received" 
              ? new Date(certificate.updatedAt).toLocaleDateString()
              : "-"}
          </p>
        </div>

        <div className="hidden md:block">
          <p className="text-gray-600">
            State: {certificate.donationId.state}
          </p>
          <p className="text-gray-600">
            City: {certificate.donationId.city}
          </p>
          <p className="text-gray-600">Address: {certificate.donationId.address}</p>
          <p className="text-gray-600">Pincode: {certificate.donationId.pincode}</p>
        </div>
      </div>
      {certificate.signature && (
        <div className="mt-4">
          <img
            src={certificate.signature}
            alt="Signature"
            className="max-h-20 object-contain"
          />
        </div>
      )}
      <button
        onClick={(e) => handleDelete(e, certificate._id)}
        className="absolute bottom-4 right-4 p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
        title="Delete certificate"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <>
      <div>{/* <Header /> */}</div>
      <div className="min-h-screen">
        <h2 className="text-3xl mb-2 font-medium text-left" style={{fontFamily:'Inter'}}>Hi,<span className=""> {profile?.loggedinuser?.fullname} </span></h2>
        <ToastContainer />
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          
          <h1
            className="md:text-2xl font-medium text-[#202224] mb-4"
            style={{fontFamily:'Inter'}}
          >
            Certificate
          </h1>
          <div className="flex flex-col sm:flex-row gap-8 items-center mb-8">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveView("all")}
                className={`flex items-center md:px-4 md:py-2 rounded-lg cursor-pointer ${
                  activeView === "all"
                    ? "bg-[#fca311] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                <Award className="w-5 h-5 mr-2" />
                All Certificates
              </button>
              <button
                onClick={() => setActiveView("add")}
                className={`flex items-center md:px-4 md:py-2 rounded-lg border border-[#fca311] cursor-pointer ${
                  activeView === "add"
                    ? " text-[#fca311]"
                    : "bg-white text-[#fca311] hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                <Plus className="w-5 h-5 mr-2 " />
                Add Certificate
              </button>
            </div>
          </div>

          {activeView === "all" ? (
            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                <div className="text-center py-8">Loading certificates...</div>
              ) : certificates?.certificates?.length > 0 ? (
                certificates.certificates.map((cert) => (
                  <CertificateCard key={cert._id} certificate={cert} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No certificates found
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-3xl rounded-lg p-6">
              <h2
                className="text-2xl font-medium mb-6"
                style={{ fontFamily: "Inter" }}
              >
                Add New Certificate
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
              >
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Donor Name
                  </label>
                  <select
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleDonorSelect}
                    className="w-full px-3 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a donor</option>
                    {donors &&
                      donors.map((donor) => (
                        <option key={donor._id} value={donor.name}>
                          {donor.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Donation ID
                  </label>
                  <input
                    type="text"
                    name="donationId"
                    value={formData.donationId}
                    className="w-full px-3 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    required
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Issued Date
                  </label>
                  <input
                    type="date"
                    name="issuedDate"
                    value={formData.issuedDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">
                    Signature
                  </label>
                  <div className="relative border-2 border-dashed border-[#fca311] rounded-lg p-4 cursor-pointer">
                    <div className="flex items-center justify-center">
                      {formData.signature ? (
                        <div className="text-sm text-gray-600">
                          File selected:{" "}
                          {formData.signature.get("signature").name}
                        </div>
                      ) : (
                        <div className="text-center">
                          <FileImage className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        name="signature"
                        onChange={handleInputChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        required
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#fca311] text-white py-2 px-4 rounded-md lg:w-64 flex justify-center items-center transition-colors duration-200 mx-auto"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Certificate"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Certificate;