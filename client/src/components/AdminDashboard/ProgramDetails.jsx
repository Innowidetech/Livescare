import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Calendar, Clock, MapPin, ArrowLeft, Trash2 } from 'lucide-react';

function ProgramDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = useSelector((state) =>
    state.program.programs.find((p) => p._id === id)
  );

  if (!program) {
    return (
      <div className="flex items-center justify-center h-full">
        <div>Program not found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Programs
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">{program.title}</h1>
          <button
            onClick={() => {
              // Handle delete
              navigate('/admin/programs');
            }}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Calendar size={20} className="mr-3" />
              <span>{new Date(program.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={20} className="mr-3" />
              <span>{program.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={20} className="mr-3" />
              <span>{program.location}</span>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 ">{program.description}</p>
            </div>
          </div>

          {program.image && (
            <div>
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgramDetails;