import React from 'react';

const AboutUs = () => {
  return (
    <div className="relative">
      {/* First container with appropriate height to avoid overlap */}
      <div className="bg-gray-50 min-h-[130vh] sm:min-h-[100vh] py-12 px-6 relative z-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
          {/* Heading on the left */}
          <div className="flex-1">
            <h2 className="text-3xl text-[#A1CB76] font-semibold text-left md:text-left mb-4 md:mb-0 ">
              About Us
            </h2>
            <h2 className="text-3xl md:text-5xl text-black font-bold text-left md:text-left mt-8 md:mb-0">
              What we think about our charity
            </h2>
          </div>

          {/* Paragraph on the right */}
          <div className="flex-1">
            <p className="text-base text-gray-700  mt-8 md:text-left text-justify">
              We are grateful for the support of our donors and volunteers, who help us to continue our mission of caring for lives.
              We invite you to join us in our efforts to create a more compassionate and just world. Whether through donations,
              volunteering, or spreading the word, your support can make a significant impact. Together, we can make a difference in the lives of people in need.
            </p>
          </div>
        </div>
      </div>

      {/* Image that overlaps the gray and orange containers, slightly higher */}
      <div className=" absolute top-[17%]  sm:top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <img
          src="Assets/Aboutmeeting.jpg"  // Adjust image path accordingly
          alt="Charity"
          className="max-w-7xl w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] xl:w-[55vw] max-h-[40vh] sm:max-h-[30vh] md:max-h-[30vh] lg:max-h-[50vh] xl:max-h-[50vh] object-cover rounded-lg shadow-lg"
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
              We make sure to provide inclusive care for children with special needs
            </h2>
            <p className="text-base text-gray-700 mt-2">
              Our mission is to empower individuals and communities by providing support, education, and resources for sustainable growth.
              We are committed to fostering a better future through collaboration and kindness.
            </p>
          </div>

          {/* Our Vision */}
          <div className="flex-1 text-start md:text-left mr-5 ml-5 pt-16 sm:pt-24 md:pt-32 lg:pt-52">
            <h3 className="text-3xl md:text-4xl font-bold text-[#6B7280] mb-4 relative z-10 flex items-center before:content-[''] before:block before:w-10 before:border-t-2 before:border-[#6B7280] mr-4">
              Our Vision
            </h3>
            <h2 className="text-3xl md:text-2xl font-bold text-[#5A5A5A]">
              Provide more inclusive care to children around the world
            </h2>
            <p className="text-base text-gray-700 mt-2">
              We envision a world where everyone has access to opportunities for growth and a brighter future.
              Our vision is built on compassion, innovation, and creating positive change in communities around the world.
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
        <h2 className="text-3xl font-bold text-[#6B7280]">5</h2>
        <p className="text-lg text-black font-semibold mt-2">Year in charity</p>
      </div>

      {/* Box 2 */}
      <div className="flex-1 min-w-[200px] max-w-[250px] bg-[#FCE8B3] text-white py-8 px-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#F9B910]">100</h2>
        <p className="text-lg text-black font-semibold mt-2">Staff Members</p>
      </div>

      {/* Box 3 */}
      <div className="flex-1 min-w-[200px] max-w-[250px] bg-[#FFDCED] text-white py-8 px-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#F60076]">14</h2>
        <p className="text-lg text-black font-semibold mt-2">Work on States</p>
      </div>

      {/* Box 4 */}
      <div className="flex-1 min-w-[200px] max-w-[250px] bg-[#EDB8FB] text-white py-8 px-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-[#8600AA]">25m</h2>
        <p className="text-lg text-black font-semibold mt-2">Helping people</p>
      </div>
    </div>
  
  </div>
</div>
<div className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
          Our Gallery
        </h3>

        {/* Gallery container with grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Image 1 */}
          <div className="overflow-hidden  shadow-lg">
            <img
              src="Assets/gallery1.jfif"
              alt="Gallery Image 1"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Image 2 */}
          <div className="overflow-hidden  shadow-lg">
            <img
              src="Assets/gallery2.jfif"
              alt="Gallery Image 2"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Image 3 */}
          <div className="overflow-hidden  shadow-lg">
            <img
              src="Assets/gallery3.jfif"
              alt="Gallery Image 3"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Image 4 */}
          <div className="overflow-hidden  shadow-lg">
            <img
         src="Assets/gallery2.jfif"
              alt="Gallery Image 4"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Image 5 */}
          <div className="overflow-hidden  shadow-lg">
            <img
              src="Assets/gallery1.jfif"
              alt="Gallery Image 5"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Image 6 */}
          <div className="overflow-hidden shadow-lg">
            <img
              src="Assets/gallery3.jfif"
              alt="Gallery Image 6"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
