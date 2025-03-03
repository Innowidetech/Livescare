import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms, addProgram, deleteProgram } from '../../redux/program';
import { Plus, Calendar, Clock, MapPin, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseSharp } from "react-icons/io5";
import { getProfile} from "../../redux/adminprofile";

function Program() {
  const dispatch = useDispatch();
  const { programs, loading, error } = useSelector((state) => state.program);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    images: [], // List of selected images
  });

  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  const { profile } = useSelector((state) => state.adminProfile);
    
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Show error toast if there's an error in the Redux state
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      images: [],
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, files } = e.target;

    if (name === 'image') {
      // Append the newly selected images to the existing ones
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      toast.error('Please select at least one image.');
      return;
    }

    try {
      const resultAction = await dispatch(addProgram(formData));
      
      if (addProgram.fulfilled.match(resultAction)) {
        toast.success('Program added successfully!');
        resetForm();
      } else if (addProgram.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload || 'Failed to add program';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add program');
    }
  };

  const handleDelete = async (programId) => {
    try {
      const resultAction = await dispatch(deleteProgram(programId));
      
      if (deleteProgram.fulfilled.match(resultAction)) {
        toast.success('Program deleted successfully!');
      } else if (deleteProgram.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload || 'Failed to delete program';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete program');
    }
  };

  const toggleDescription = (programId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [programId]: !prev[programId],
    }));
  };

  const truncateDescription = (text, limit = 100) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const isPastEvent = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const programDate = new Date(eventDate);
    programDate.setHours(0, 0, 0, 0);
    return programDate < today;
  };

  const sortedPrograms = [...programs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const isPastA = isPastEvent(a.date);
    const isPastB = isPastEvent(b.date);

    if (isPastA === isPastB) {
      return dateA - dateB;
    }
    return isPastA ? 1 : -1;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FCA311]"></div>
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 md:mt-11 flex-col md:flex-row mt-10">
        <h2 className="text-3xl mb-2 font-medium text-left" style={{ fontFamily: 'Inter' }}>
          Hi,<span className=""> {profile?.loggedinuser?.fullname} </span>
        </h2>
        <h2 className="md:text-2xl font-medium text-[#202224]" style={{ fontFamily: 'Inter' }}>
          Our Programs
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FCA311] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e39310] transition-colors mt-4 md:mt-0"
        >
          <Plus size={20} />
          Add Program
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedPrograms.map((program) => {
          const isPast = isPastEvent(program.date);
          return (
            <div
              key={program._id}
              className={`${
                isPast ? 'bg-gray-200 grayscale' : 'bg-[#ffba48]'
              } rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative`}
            >
              {isPast && (
                <div className="hidden md:block lg:hidden absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                  Past Event
                </div>
              )}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold ${isPast ? 'text-gray-700' : 'text-gray-800'} mb-4`}>
                    {program.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className={`flex items-center ${isPast ? 'text-gray-600' : 'text-gray-600'}`}>
                      <Calendar size={16} className="mr-2" />
                      <span>{new Date(program.date).toLocaleDateString()}</span>
                    </div>
                    <div className={`flex items-center ${isPast ? 'text-gray-600' : 'text-gray-600'}`}>
                      <Clock size={16} className="mr-2" />
                      <span>{program.time}</span>
                    </div>
                    <div className={`flex items-center ${isPast ? 'text-gray-600' : 'text-gray-600'}`}>
                      <MapPin size={16} className="mr-2" />
                      <span>{program.location}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className={`${isPast ? 'text-gray-600' : 'text-gray-600'}`}>
                      {expandedDescriptions[program._id]
                        ? program.description
                        : truncateDescription(program.description)}
                    </p>
                    {program.description.split(' ').length > 100 && (
                      <button
                        onClick={() => toggleDescription(program._id)}
                        className={`${
                          isPast ? 'text-gray-600 hover:text-gray-800' : 'text-[#FCA311] hover:text-[#e39310]'
                        } mt-2 flex items-center gap-1`}
                      >
                        {expandedDescriptions[program._id] ? (
                          <>Show Less <ChevronUp size={16} /></>
                        ) : (
                          <>Read More <ChevronDown size={16} /></>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className="lg:w-1/3 relative">
                  {program.image && (
                    <img
                      src={program.image[0]}
                      alt={program.title}
                      className={`w-full h-64 object-cover rounded-lg ${isPast ? 'grayscale' : ''}`}
                    />
                  )}
                  <button
                    onClick={() => handleDelete(program._id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full text-red-500 hover:text-red-700 transition-colors shadow-md"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Program Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoCloseSharp className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Select 2 Images
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  accept="image/*"
                  required
                  multiple
                />
                {formData.images.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.images.length} image{formData.images.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-[#FCA311] text-white py-2 rounded-lg hover:bg-[#e39310] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Program;