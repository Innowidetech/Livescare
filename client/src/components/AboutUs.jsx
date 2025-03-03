import React, { useState, useEffect } from 'react';
import Gallery6 from '../Assets/gallery6.png';
import Charity from '../Assets/Aboutmeeting.png'
import Gallery1 from '../Assets/gallery1.jfif';
import Gallery2 from '../Assets/gallery2.jfif';
import Gallery3 from '../Assets/gallery3.jfif';
import Gallery4 from '../Assets/gallery4.png';
import Gallery5 from '../Assets/gallery5.png';

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState([]);

  useEffect(() => {
    // Fetching the data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://livescare.onrender.com/api/user/aboutUs');
        const data = await response.json();
        setAboutUsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!aboutUsData) {
    return <div>Loading...</div>; // Show loading until the data is fetched
  }
// console.log(aboutUsData)

  return (
    <div className="relative">
      {/* First container with adjusted height to avoid overlap */}
      <div className="bg-white min-h-[80vh] sm:min-h-[90vh] md:min-h-[100vh] lg:min-h-[80vh] py-12 px-6 relative z-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
          {/* Heading on the left */}
          <div className="flex-1">
            <h2 className="text-3xl text-[#A1CB76] font-semibold text-left md:text-left mb-4 md:mb-0 mt-8">
              About Us
            </h2>
            <h2 className="text-3xl md:text-5xl text-black font-bold text-left md:text-left mt-8 md:mb-0">
              What We Believe
            </h2>
          </div>

          {/* Paragraph on the right */}
          <div className="flex-1">
            <p className="text-base text-gray-700 mt-20 md:text-left text-justify ">
              At LivesCare, we are deeply thankful for the generosity and dedication of our donors and volunteers. Their unwavering support fuels our mission of caring for lives and creating opportunities for those in need. We invite you to join us in building a more compassionate and equitable world. Whether through donations, volunteering, or spreading awareness, your efforts can leave a lasting impact. Together, we can transform lives and inspire hope in communities that need it the most.
            </p>
          </div>
        </div>
      </div>

      {/* Image section */}
      <div className="relative z-10 md:mb-20 sm:mb-32 mb-10 ">
        <img
          src={Charity}
          alt="Charity"
          className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] xl:w-[55vw] max-h-[40vh] sm:max-h-[30vh] md:max-h-[30vh] lg:max-h-[50vh] xl:max-h-[50vh] object-cover rounded-lg shadow-lg mx-auto"
        />
      </div>

      {/* Second container with orange background */}
      <div className="bg-[#FFBA48] py-12 min-h-[80vh] sm:min-h-[80vh] px-6 relative z-0 mt-[-20vh] sm:mt-[-25vh] md:mt-[-30vh]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Our Mission */}
          <div className="flex-1 text-start md:text-left ml-5 mb-8 md:mb-0 pt-16 sm:pt-24 md:pt-32 lg:pt-52">
            <h3 className="text-3xl md:text-4xl font-bold text-[#6B7280] mb-4 relative z-10 flex items-center before:content-[''] before:block before:w-10 before:border-t-2 before:border-[#6B7280] mr-4">
              Our Mission
            </h3>
            <h2 className="text-3xl md:text-2xl font-bold text-[#5A5A5A]">
              Creating a Supportive World for Every Child
            </h2>
            <p className="text-base text-gray-700 mt-2">
              We are dedicated to providing holistic and inclusive care for children with special needs. Through our initiatives, we aim to empower these children with resources that nurture their growth, learning, and happiness. By fostering an environment of understanding and support, we ensure that every child, regardless of their abilities, receives the care and opportunities they deserve.
            </p>
          </div>

          {/* Our Vision */}
          <div className="flex-1 text-start md:text-left mr-5 ml-5 pt-16 sm:pt-24 md:pt-32 lg:pt-52">
            <h3 className="text-3xl md:text-4xl font-bold text-[#6B7280] mb-4 relative z-10 flex items-center before:content-[''] before:block before:w-10 before:border-t-2 before:border-[#6B7280] mr-4">
              Our Vision
            </h3>
            <h2 className="text-3xl md:text-2xl font-bold text-[#5A5A5A]">
              A Future Where Every Child Thrives
            </h2>
            <p className="text-base text-gray-700 mt-2">
              Our vision is to extend inclusive care and opportunities to children worldwide, ensuring no one is left behind. We aspire to build a future where children, regardless of their circumstances, have access to the education, healthcare, and support they need to reach their full potential. By championing compassion and equality, we aim to create a brighter, more inclusive world for generations to come.
            </p>
          </div>
        </div>
      </div>

      {/* Third container after the orange container */}
      <div className="bg-white py-12 px-6 relative z-0">
        <div className="max-w-7xl mx-auto text-center">
          {/* Container for the 4 boxes */}
          <div className="flex flex-wrap justify-center gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
            {/* Box 1 */}
            <div className="flex-1 min-w-[200px] max-w-[250px] bg-[#5C080826] text-white py-8 px-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-[#6B7280]">{aboutUsData.yearsCount} + </h2>
              <p className="text-lg text-black font-semibold mt-2">Year in charity</p>
            </div>

            {/* Box 2 */}
            <div className="flex-1 min-w-[200px] max-w-[250px] bg-[#FCE8B3] text-white py-8 px-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-[#F9B910]">{aboutUsData.membersCount}</h2>
              <p className="text-lg text-black font-semibold mt-2">Staff Members</p>
            </div>

            {/* Box 3 */}
            <div className="flex-1 min-w-[200px] max-w-[250px] bg-[#FFDCED] text-white py-8 px-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-[#F60076]">{aboutUsData.statesCount}</h2>
              <p className="text-lg text-black font-semibold mt-2">Work on States</p>
            </div>

            {/* Box 4 */}
            <div className="flex-1 min-w-[200px] max-w-[250px] bg-[#EDB8FB] text-white py-8 px-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-[#8600AA]">{aboutUsData.submitsCount}</h2>
              <p className="text-lg text-black font-semibold mt-2">Helping people</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Our Gallery
          </h3>
          {/* Gallery container with grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Image 1 */}
            <div className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:opacity-90">
              <img
                src={Gallery1}
                alt="Gallery Image 1"
                className="w-full h-auto object-cover transition-opacity duration-500"
              />
            </div>
            {/* Image 2 */}
            <div className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:opacity-90">
              <img
                src={Gallery2}
                alt="Gallery Image 2"
                className="w-full h-auto object-cover transition-opacity duration-500"
              />
            </div>
            {/* Image 3 */}
            <div className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:opacity-90">
              <img
                src={Gallery3}
                alt="Gallery Image 3"
                className="w-full h-auto object-cover transition-opacity duration-500"
              />
              
            </div>
            {/* Image 4 */}
  <div className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:opacity-90">
    <img
      src={Gallery4}
      alt="Gallery Image 4"
      className="w-full h-auto object-cover transition-opacity duration-500"
    />
  </div>

  {/* Image 5 */}
  <div className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:opacity-90">
    <img
      src={Gallery5}
      alt="Gallery Image 5"
      className="w-full h-auto object-cover transition-opacity duration-500"
    />
  </div>

  {/* Image 6 */}
  <div className="overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-2xl hover:opacity-90">
    <img
      src={Gallery6}
      alt="Gallery Image 6"
      className="w-full h-auto object-cover transition-opacity duration-500"
    />
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
