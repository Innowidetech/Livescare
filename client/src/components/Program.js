import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; // import icons

const Program = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = windowWidth < 768; // Example breakpoint for small screens

  return (
    <div>
      {/* Existing Section */}
      <section
        className={`bg-[#FCA311] ${isSmallScreen ? 'py-8 px-4' : 'py-12 px-8'}  text-black flex flex-col items-center justify-center text-center  ${isSmallScreen ? 'h-auto' : 'h-[300px]'}`}
      >
        <h1 className= { `text-4xl  ${isSmallScreen ? '4xl' : '5xl'}  font-bold `}>
          A day with our wonderful Children
        </h1>

        <div
          className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'} items-center justify-center gap-8 mb-${isSmallScreen ? '5' : '8'}`}
        >
          <div className="flex items-center text-sm">
            <FaMapMarkerAlt className="mr-2 text-sm" />
            <span>New York, NY</span>
          </div>

          <div className="flex items-center text-sm">
            <FaCalendarAlt className="mr-2 text-sm" />
            <span>January 16, 2025 8:30 AM</span>
          </div>
        </div>
      </section>

      {/* New Section */}
      <section className={`px-${isSmallScreen ? '4' : '6'} py-${isSmallScreen ? '5' : '10'} text-left max-w-7xl mx-auto`}>
        {/* Heading "About Us" */}
        <h2
          className={`text-${isSmallScreen ? '2xl' : '3xl'} mb-5 font-bold text-[#FCA311] mx-auto ${isSmallScreen ? '' : 'max-w-4xl'}`}
        >
          About
        </h2>

        {/* Paragraphs */}
        <div className="mb-5 max-w-4xl mx-auto">
          <p className="text-lg leading-7 mb-5">
            Et morbi vitae lobortis nam odio. Faucibus vitae vel neque nullam in in lorem platea mattis.
            Euismod aenean rhoncus scelerisque amet tincidunt scelerisque aliquam. Luctus porttitor elit
            vel sapien, accumsan et id ut est. Posuere molestie in turpis quam. Scelerisque in viverra mi
            ut quisque. In sollicitudin sapien, vel nulla quisque vitae. Scelerisque eget accumsan, non in.
            Posuere magna erat bibendum amet, nisi eu id.
          </p>

          <p className="text-lg leading-7 mb-5">
            Viverra at diam nunc non ornare. Sed ultricies pulvinar nunc, lacus sem. Tellus aliquam ut
            euismod cursus dui lectus. Ut amet, cras volutpat dui. A bibendum viverra eu cras. Mauris
            morbi sed dignissim a in nec aliquam fringilla et. Mattis elit dignissim nibh sit. Donec arcu
            sed elit scelerisque tempor ornare tristique. Integer faucibus duis praesent tempor feugiat
            ornare in. Erat libero egestas porttitor nunc pellentesque mauris et pulvinar eget.
          </p>
        </div>

        {/* Image from public/assets folder */}
        <img
          src="/assets/programimg.jfif"
          alt="Program"
          className="w-full max-w-4xl max-h-[300px] h-auto rounded-lg mb-5 mx-auto"
        />

        {/* Additional Paragraph */}
        <div className="mb-5 max-w-4xl mx-auto">
          <p className="text-lg leading-7">
            Donec egestas nunc eget erat ultricies. Integer faucibus duis praesent tempor feugiat ornare in.
            Duis euismod tincidunt aliquam. Phasellus pharetra eros vitae massa suscipit, et maximus velit
            viverra. Quisque suscipit orci a turpis feugiat, a vehicula purus aliquet.
          </p>
        </div>
      </section>

      <section className="py-16">
        {/* Heading "Our Programs" */}
        <div className="container mx-auto px-6 md:px-0 text-left">
          <h2 className="text-3xl font-bold sm:text-xl lg:text-4xl">Our Programs</h2>
        </div>

        {/* Rectangular Boxes */}
        <div className="flex flex-col justify-center items-center gap-6 mt-8 mx-auto container px-6 md:px-0">
          {/* First Box */}
          <div className="flex flex-col items-center bg-[#FFBA48] text-black py-4 px-6 rounded-lg w-full h-[150px]">
            {/* Date and Two Headings */}
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-semibold">13</span>
                <span className="text-xl">JAN</span>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-sm text-center">Next Program</h3>
                <h4 className="text-lg font-bold text-center">A day with our wonderful <br />children</h4>
              </div>
              {/* Circular 'Next' Arrow Button */}
              <div className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Second Box */}
          <div className="flex flex-col items-center bg-[#FFBA48] text-black py-4 px-6 rounded-lg w-full h-[150px]">
            {/* Date and Two Headings */}
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-semibold">24</span>
                <span className="text-xl">APR</span>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-sm text-center">Next Program</h3>
                <h4 className="text-lg font-bold text-center ">Lets Run for senior citizens</h4>
              </div>
              {/* Circular 'Next' Arrow Button */}
              <div className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Program;
