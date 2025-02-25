import React, { useEffect } from "react";
import { Calendar, Clock, MapPin, Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProgramById } from "../redux/homepagePrograms";

function ProgramDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProgram, loading, error } = useSelector((state) => state.programs);

  useEffect(() => {
    if (id) {
      dispatch(fetchProgramById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-blue-600">
          <Loader className="w-6 h-6 animate-spin" />
          <span className="text-xl font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-600 bg-red-50 px-6 py-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!currentProgram) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Program not found</div>
      </div>
    );
  }

  // Safely access program data
  const program = currentProgram.program || currentProgram;

  // console.log(program)

  return (
    <>
      <div className="">
        <div className="bg-[#fca311] overflow-hidden">
          <div className="p-8 mt-14" style={{fontFamily:'Inter'}}>
            <h1 className="text-3xl font-medium text-[#14213d] mb-6 text-center">
              {program.programs.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-[#14213d] mb-8 justify-center">
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-black" />
                <span>
                  {new Date(program.programs.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-black" />
                <span>{program.programs.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-black" />
                <span>{program.programs.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="p-8 lg:p-12">
          <h2
            className="text-xl lg:text-3xl font-medium text-[#fca311] mb-4"
            style={{ fontFamily: "Inter" }}
          >
            About
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-xl text-[#525560]">
            {program.programs.description}
          </p>
        </div>
        <div className="p-8 lg:p-12 md:flex gap-4 space-y-4 md:space-y-0">
        {program.programs.image && (
  <img 
    src={program.programs.image[0]} 
    alt={program.programs.title} 
    className="md:max-w-[400px] lg:max-w-[600px] border border-red-500" 
  />
)}

{program.programs.image && program.programs.image[1] && (
  <img 
    src={program.programs.image[1]} 
    alt={program.programs.title} 
    className="md:max-w-[400px] lg:max-w-[600px] border border-green-500" 
  />
)}

        </div>
      </div>
    </>
  );
}

export default ProgramDetails;