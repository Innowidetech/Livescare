import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile, setIsEditing } from "../../redux/adminprofile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";

function AdminProfile() {
  const dispatch = useDispatch();
  const { profile, loading, isEditing } = useSelector((state) => state.adminProfile);
  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState("");

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.loggedinuser) {
      setFormData({
        newFullname: profile.loggedinuser.fullname || '',
        newUsername: profile.loggedinuser.username || '',
        newEmail: profile.loggedinuser.email || '',
        newMobileNumber: profile.loggedinuser.mobileNumber || '',
        newState: profile.loggedinuser.state || '',
        newCity: profile.loggedinuser.city || '',
        newPincode: profile.loggedinuser.pincode || '',
        newWhatsapp: profile.loggedinuser.whatsapp || profile.loggedinuser.mobileNumber || '', // Updated to match backend
        newFacebook: profile.loggedinuser.facebook || '',
        newTwitter: profile.loggedinuser.twitter || '',
        newLinkedin: profile.loggedinuser.linkedin || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    // Only append fields that have changed
    Object.keys(formData).forEach(key => {
      if (formData[key] !== profile?.loggedinuser?.[key.replace('new', '').toLowerCase()]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append photo only if it exists
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    await dispatch(updateProfile(formDataToSend));
    dispatch(setIsEditing(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FCA311]"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-4 md:p-6">
        <h1
          className="md:text-3xl text-[#202224] font-medium"
          style={{ fontFamily: "Inter" }}
        >
          Welcome, {profile?.loggedinuser?.fullname}
        </h1>
      </div>
      <div className="md:grid lg:flex lg:justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={
              profile?.loggedinuser?.photo ||
              "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            }
            alt={profile?.loggedinuser?.fullname}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div>
            <h1 className="text-xl font-medium text-[#000000]" style={{fontFamily:'Inter'}}>
              {profile?.loggedinuser?.fullname}
            </h1>
            <h2 className="text-xs lg:text-lg text-[#000000] opacity-50" style={{fontFamily:'Inter'}}>
              {profile?.loggedinuser?.email}
            </h2>
          </div>
        </div>
        <button 
          onClick={() => dispatch(setIsEditing(true))}
          className="bg-[#fca311] text-white text-lg rounded-lg p-3 w-24 mt-6 ml-6 lg:ml-0 lg:mt-0"
        >
          Edit
        </button>
      </div>
      <div className="p-4 md:py-10">
        <div className="overflow-hidden p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">Full Name</h1>
              <input 
                type="text" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.fullname || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">User Name</h1>
              <input 
                type="text" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.username || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">Email</h1>
              <input 
                type="email" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.email || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">Mobile Number</h1>
              <input 
                type="tel" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.mobileNumber || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">State</h1>
              <input 
                type="text" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.state || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">City</h1>
              <input 
                type="text" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.city || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">Pincode</h1>
              <input 
                type="text" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.pincode || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">Whatsapp Number</h1>
              <input 
                type="tel" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.whatsapp || profile?.loggedinuser?.mobileNumber || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">Facebook Link</h1>
              <input 
                type="url" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.facebook || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">Twitter Link</h1>
              <input 
                type="url" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.twitter || ''}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-lg text-[#000000]">LinkedIn Link</h1>
              <input 
                type="url" 
                className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                value={profile?.loggedinuser?.linkedin || ''}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Edit Profile</h2>
                <button 
                  onClick={() => dispatch(setIsEditing(false))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={photoPreview || profile?.loggedinuser?.photo || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#fca311]"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="absolute bottom-0 right-0 bg-[#fca311] text-white p-2 rounded-full cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", name: "newFullname", type: "text" },
                    { label: "Username", name: "newUsername", type: "text" },
                    { label: "Email", name: "newEmail", type: "email" },
                    { label: "Mobile Number", name: "newMobileNumber", type: "tel" },
                    { label: "State", name: "newState", type: "text" },
                    { label: "City", name: "newCity", type: "text" },
                    { label: "Pincode", name: "newPincode", type: "text" },
                    { label: "WhatsApp Number", name: "newWhatsapp", type: "tel" },
                    { label: "Facebook Link", name: "newFacebook", type: "url" },
                    { label: "Twitter Link", name: "newTwitter", type: "url" },
                    { label: "LinkedIn Link", name: "newLinkedin", type: "url" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-lg text-[#000000]">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => dispatch(setIsEditing(false))}
                    className="px-6 py-2 border border-[#fca311] text-[#fca311] rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#fca311] text-white rounded-lg hover:bg-[#e59310]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminProfile;