import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile, setIsEditing } from "../../redux/adminprofile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X, PencilIcon } from "lucide-react";

function AdminProfile() {
  const dispatch = useDispatch();
  const { profile, loading, isEditing } = useSelector((state) => state.adminProfile);
  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [validatedFields, setValidatedFields] = useState({
    facebook: false,
    twitter: false,
    linkedin: false
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.loggedinuser) {
      setFormData({
        fullname: profile.loggedinuser.fullname || '',
        username: profile.loggedinuser.username || '',
        email: profile.loggedinuser.email || '',
        mobileNumber: profile.loggedinuser.mobileNumber || '',
        state: profile.loggedinuser.state || '',
        city: profile.loggedinuser.city || '',
        pincode: profile.loggedinuser.pincode || '',
        whatsapp: profile.loggedinuser.whatsapp || profile.loggedinuser.mobileNumber || '',
        facebook: profile.loggedinuser.facebook || '',
        twitter: profile.loggedinuser.twitter || '',
        linkedin: profile.loggedinuser.linkedin || '',
      });
      // Mark existing social media links as validated
      setValidatedFields({
        facebook: !!profile.loggedinuser.facebook,
        twitter: !!profile.loggedinuser.twitter,
        linkedin: !!profile.loggedinuser.linkedin
      });
    }
  }, [profile]);

  const validateSocialMediaLink = (url, platform) => {
    if (!url) return true;
    
    // Updated patterns to allow base URLs and more flexible formats
    const patterns = {
      facebook: /^(https?:\/\/)?(www\.)?(facebook|fb)\.com(\/.*)?$/,
      twitter: /^(https?:\/\/)?(www\.)?twitter\.com(\/.*)?$/,
      linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com(\/.*)?$/
    };

    return patterns[platform].test(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Only validate social media links if they've been changed
    if (['facebook', 'twitter', 'linkedin'].includes(name)) {
      // Only validate if the value is different from the original
      if (value !== profile?.loggedinuser?.[name]) {
        if (value && !validateSocialMediaLink(value, name)) {
          setErrors(prev => ({
            ...prev,
            [name]: `Please enter a valid ${name} URL`
          }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
          });
        }
        setValidatedFields(prev => ({
          ...prev,
          [name]: true
        }));
      }
    }
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
    
    // Only validate changed social media links
    const newErrors = {};
    ['facebook', 'twitter', 'linkedin'].forEach(platform => {
      if (formData[platform] !== profile?.loggedinuser?.[platform]) {
        if (formData[platform] && !validateSocialMediaLink(formData[platform], platform)) {
          newErrors[platform] = `Please enter a valid ${platform} URL`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the social media URL errors");
      return;
    }

    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === 'photo' && formData[key]) {
        formDataToSend.append('photo', formData[key]);
      } else {
        formDataToSend.append(`new${key.charAt(0).toUpperCase() + key.slice(1)}`, formData[key]);
      }
    });

    try {
      await dispatch(updateProfile(formDataToSend));
      dispatch(getProfile());
      toast.success("Profile updated successfully");
      // Reset validated fields after successful update
      setValidatedFields({
        facebook: false,
        twitter: false,
        linkedin: false
      });
    } catch (error) {
      toast.error("Failed to update profile");
    }
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
        <h1 className="md:text-3xl text-[#202224] font-medium" style={{ fontFamily: "Inter" }}>
          Welcome, {profile?.loggedinuser?.fullname}
        </h1>
      </div>
      <div className="md:grid lg:flex lg:justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profile?.loggedinuser?.photo || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}
              alt={profile?.loggedinuser?.fullname}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {!isEditing && (
              <button
                onClick={() => dispatch(setIsEditing(true))}
                className="absolute bottom-0 right-0 bg-[#fca311] text-white p-2 rounded-full hover:bg-[#e59310] transition-colors"
              >
                <PencilIcon size={16} />
              </button>
            )}
          </div>
          <div>
            <h1 className="text-xl font-medium text-[#000000]" style={{fontFamily:'Inter'}}>
              {profile?.loggedinuser?.username}
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

      {/* Profile Display */}
      <div className="p-4 md:py-10">
        <div className="overflow-hidden p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", value: profile?.loggedinuser?.fullname },
              { label: "Username", value: profile?.loggedinuser?.username },
              { label: "Email", value: profile?.loggedinuser?.email },
              { label: "Mobile Number", value: profile?.loggedinuser?.mobileNumber },
              { label: "State", value: profile?.loggedinuser?.state },
              { label: "City", value: profile?.loggedinuser?.city },
              { label: "Pincode", value: profile?.loggedinuser?.pincode },
              { label: "WhatsApp Number", value: profile?.loggedinuser?.whatsapp || profile?.loggedinuser?.mobileNumber },
              { label: "Facebook Link", value: profile?.loggedinuser?.facebook },
              { label: "Twitter Link", value: profile?.loggedinuser?.twitter },
              { label: "LinkedIn Link", value: profile?.loggedinuser?.linkedin }
            ].map((field) => (
              <div key={field.label} className="space-y-2">
                <h1 className="text-lg text-[#000000]">{field.label}</h1>
                <input 
                  type="text"
                  className="w-full px-4 text-[#000000] opacity-60 py-2 border border-[#fca311] rounded-md"
                  value={field.value || ''}
                  readOnly
                />
              </div>
            ))}
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
                    <label className="absolute bottom-0 right-0 bg-[#fca311] text-white p-2 rounded-full cursor-pointer hover:bg-[#e59310] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <PencilIcon size={16} />
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Regular fields */}
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-[#fca311]"
                    />
                  </div>

                  {/* Social Media Fields */}
                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">Facebook Link</label>
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook || ''}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/username"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.facebook ? 'border-red-500 focus:ring-red-200' : 'border-[#fca311] focus:ring-[#fca311]'
                      }`}
                    />
                    {errors.facebook && validatedFields.facebook && (
                      <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">Twitter Link</label>
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter || ''}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/username"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.twitter ? 'border-red-500 focus:ring-red-200' : 'border-[#fca311] focus:ring-[#fca311]'
                      }`}
                    />
                    {errors.twitter && validatedFields.twitter && (
                      <p className="text-red-500 text-sm mt-1">{errors.twitter}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-lg text-[#000000]">LinkedIn Link</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin || ''}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.linkedin ? 'border-red-500 focus:ring-red-200' : 'border-[#fca311] focus:ring-[#fca311]'
                      }`}
                    />
                    {errors.linkedin && validatedFields.linkedin && (
                      <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
                    )}
                  </div>
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
                    disabled={loading || Object.keys(errors).length > 0}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
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