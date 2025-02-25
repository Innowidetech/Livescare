import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../redux/memberSlice";
import { ChevronDown } from "lucide-react";
import Header from "./layout/AdminHeader";
import { getProfile} from "../../redux/adminprofile";
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import AddMemberModal from "./AddMemberModel";
// import { toast } from 'react-toastify';

function Members() {
  const dispatch = useDispatch();
  const { members, status, error } = useSelector((state) => state.member);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const { profile } = useSelector((state) => state.adminProfile);
  
     useEffect(() => {
        dispatch(getProfile());
      }, [dispatch]);
  

  const handleModalSuccess = () => {
    dispatch(fetchMembers());
  };

  const FilterButton = ({ text, icon }) => (
    <button className="flex items-center gap-2 md:gap-2 md:px-4 md:py-2 text-[#808080] border border-[#E5E5E5] rounded-lg text-xs md:text-lg">
      <span>{text}</span>
      {icon && <ChevronDown className="w-4 h-4" />}
    </button>
  );

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

  const membersList = members?.members || [];

  return (
    <>
      {/* <toast position="top-right" /> */}
      {/* <Header /> */}
      <div className="min-h-screen p-4 md:mt-12 mt-10">
        <div className="">
        <div className="flex flex-col gap-6">
  {/* Greeting and Members Section */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
    {/* User Greeting Text */}
    <h2 className="text-xl sm:text-3xl mb-2 font-medium text-left" style={{ fontFamily: 'Inter' }}>
      Hi,<span className=""> {profile?.loggedinuser?.fullname} </span>
    </h2>

    {/* Members Text */}
    <h1
      className="text-2xl sm:text-xl md:text-2xl font-medium text-[#202224]"
      style={{ fontFamily: 'Inter' }}
    >
      Members
    </h1>

    {/* Add New Member Button */}
    <button
      className="bg-[#FF9500] text-white md:px-4 md:py-2 p-2 rounded-lg sm:w-full md:w-auto"
      style={{ fontFamily: 'Inter' }}
      onClick={() => setIsModalOpen(true)}
    >
      Add New Member
    </button>
  </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {membersList.map((member, index) => {
                const hasSocialLinks =
                  member.whatsapp ||
                  member.facebook ||
                  member.twitter ||
                  member.linkedin;

                return (
                  <div className="p-4" key={index}>
                    <div className="flex flex-col items-center justify-center text-center">
                      <img
                        src={member.photo}
                        alt={member.fullname}
                        className="rounded-lg md:h-40 md:w-48 mb-4"
                      />
                      <h1
                        className="text-[#1D2130] text-xl"
                        style={{ fontFamily: "Roboto" }}
                      >
                        {member.fullname}
                      </h1>
                      <h1
                        className="text-[#1d2130] opacity-80 text-lg font-light"
                        style={{ fontFamily: "Roboto" }}
                      >
                        {member.designation}
                      </h1>
                      <h1
                        className="text-[#FCA311]"
                        style={{ fontFamily: "Roboto" }}
                      >
                        {member.city} 
                      </h1>
                      <h1
                        className="text-[#FCA311]"
                        style={{ fontFamily: "Roboto" }}
                      >
                        {member.pincode} 
                      </h1>

                      <div className="flex gap-4 py-3 text-2xl text-[#1d2130] opacity-80">
                        {hasSocialLinks ? (
                          <>
                            {member.whatsapp && (
                              <a
                                href={member.whatsapp}
                                className="cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaWhatsapp />
                              </a>
                            )}
                            {member.facebook && (
                              <a
                                href={member.facebook}
                                className="cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaFacebook />
                              </a>
                            )}
                            {member.twitter && (
                              <a
                                href={member.twitter}
                                className="cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaTwitter />
                              </a>
                            )}
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                className="cursor-pointer"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaLinkedin />
                              </a>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No social media accounts
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AddMemberModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}

export default Members;