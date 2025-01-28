import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; // Import the Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Slider from 'react-slick'; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css";  // Import Slick CSS
import "slick-carousel/slick/slick-theme.css";  // Import Slick Theme CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



ChartJS.register(ArcElement, Tooltip, Legend);



const DonutChart = () => {
  const data = {
    labels: ['Food', 'Clothes', 'Education', 'Medical', 'cash'],
    datasets: [
      {
        label: 'Donation Distribution',
        data: [40, 30, 20, 10, 5], // These values represent the percentages for each category
        backgroundColor: ['#03318C', '#EE0072', '#7D5B0C', '#CE5E94', '#FFFBEF'],
        borderWidth: 0, // Remove border
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: 'top',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};





const HomePage = () => {

  const settings = {
    dots: false, // Hide dot navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed in ms
    slidesToShow: 2, // Default to show 2 images at a time
    slidesToScroll: 1, // Scroll one image at a time
    arrows: true, // Show navigation arrows
    responsive: [
      {
        breakpoint: 1024, // Tablets and up (Default setting for desktop)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Tablets and smaller devices
        settings: {
          slidesToShow: 1, // Show 1 image on smaller screens
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1, // Show 1 image on mobile screens
        },
      },
    ],
  };

  const images = [
    {
      src: "/Assets/SlideChil1.png",
      title: "Campaign to provide food for the poor",
      description: "Rs 2,00,000  Needed Donetion",
      location: "USA"
    },
    {
      src: "/Assets/SlideChil2.png",
      title: "Senior citizens should be given food daily",
      description: "Rs 2,00,000  Needed Donetion",
      location: "Australia"
    },
    {
      src: "/Assets/SlideChil3.webp",
      title: "Joyful Moments",
      description: "Capturing pure moments of joy and happiness.",
      location: "Canada"
    },
    {
      src: "/Assets/SlideChil4.jpg",
      title: "Adventure Awaits",
      description: "Embark on new adventures with endless possibilities.",
      location: "New Zealand"
    }
  ];


  const [selectedSection, setSelectedSection] = useState('healthyFood');
  return (



    <div>
      {/* Background Image and Text Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/Assets/HomeChil.avif)' }}>
  <div className="relative z-10 flex items-center justify-center sm:justify-start h-full px-6 text-white">
    <div className="max-w-lg text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">We Can</h1>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Help <span className="text-[#FCA311]">The Poor</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-6">
        They mobilize volunteers, raise awareness, and provide essential services that improve the quality of life for countless individuals!
      </p>
      <Link to="/registration">  {/* Link to registration page */}
      <button className="bg-[#FCA311] px-6 py-2 rounded-md font-bold text-base sm:text-lg">
        Join With Us
      </button>
    </Link>
    </div>
  </div>
</section>

      {/* White Background Container with Centered Heading */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Welcome to <span className="text-[#FCA311]">LivesCare</span></h2>
          <h2 className="text-4xl font-semibold mt-4">We Believe That We Can Save </h2>
          <h2 className="text-4xl font-semibold mt-2"> More Lives With You </h2>
        </div>
      </section>

      {/* Circle with Text Section */}
      <div className="flex flex-col md:flex-row items-center justify-between relative px-6 sm:px-10 lg:px-24 py-8">
        {/* Circle with Specific Styles */}
        <div className="w-[300px] sm:w-[300px] md:w-[500px] h-[300px] sm:h-[300px] md:h-[500px] bg-[#FCA311] rounded-full mb-4 md:mb-0">
          <div className="w-full h-full flex justify-center items-center">
            <img
              src="/path/to/your/image.jpg"
              alt="Circle Content"
              className="w-36 h-36 object-cover rounded-full"
            />
          </div>
        </div>

        {/* Text and Headings Section */}
        <div className="text-lg md:text-left max-w-lg px-6 md:px-0">
      {/* Three Headings Horizontally with Underlines as Buttons */}
      <div className="flex space-x-6 sm:space-x-4 mb-6">
        <h3
          className={`text-xl font-bold pb-2 cursor-pointer ${
            selectedSection === 'healthyFood'
              ? 'text-[#FCA311] border-b-2 border-[#FCA311]'
              : 'text-black border-b-2 border-transparent hover:text-[#FCA311] hover:border-[#FCA311]'
          }`}
          onClick={() => setSelectedSection('healthyFood')}
        >
          Healthy Food
        </h3>
        <h3
          className={`text-xl font-bold pb-2 cursor-pointer ${
            selectedSection === 'medicalFacilities'
              ? 'text-[#FCA311] border-b-2 border-[#FCA311]'
              : 'text-black border-b-2 border-transparent hover:text-[#FCA311] hover:border-[#FCA311]'
          }`}
          onClick={() => setSelectedSection('medicalFacilities')}
        >
          Medical Facilities
        </h3>
        <h3
          className={`text-xl font-bold pb-2 cursor-pointer ${
            selectedSection === 'educationFacilities'
              ? 'text-[#FCA311] border-b-2 border-[#FCA311]'
              : 'text-black border-b-2 border-transparent hover:text-[#FCA311] hover:border-[#FCA311]'
          }`}
          onClick={() => setSelectedSection('educationFacilities')}
        >
          Education Facilities
        </h3>
      </div>

      {/* Paragraph */}
      <p>
        Healthy food refers to foods that are nutritious and beneficial for maintaining overall health and well-being. These foods are typically rich in essential nutrients, such as vitamins, minerals, fiber, and healthy fats, and low in sodium.
      </p>

      {/* Conditional Content Display based on selected section */}
      <div className="mt-8">
        {selectedSection === 'healthyFood' && (
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Side Image */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <img
                src="/Assets/chil1.jpg"
                alt="Image Description"
                className="w-full h-auto object-cover rounded-md transform -translate-x-8"
              />
            </div>

            {/* Right Side Text (Bullet Points) */}
            <div className="w-full md:w-1/1 text-lg md:text-left px-6 md:px-0">
              <ul className="list-disc list-inside">
                <li className="mb-2">Friendly fundraising features.</li>
                <li className="mb-2">Easily manage donor profiles.</li>
                <li className="mb-2">Features like monthly gifts.</li>
              </ul>
            </div>
          </div>
        )}

        {selectedSection === 'medicalFacilities' && (
          <div>
            <h3 className="text-xl font-bold">Medical Facilities Section</h3>
            <p>Details about medical facilities go here.</p>
          </div>
        )}

        {selectedSection === 'educationFacilities' && (
          <div>
            <h3 className="text-xl font-bold">Education Facilities Section</h3>
            <p>Details about education facilities go here.</p>
          </div>
        )}
      </div>
    </div>
    </div>

      

          {/* Process Boxes Section */}
          <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Our Process</h2>

          {/* Process Boxes Section */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">

            {/* Process Box 1 (Biggest Box) */}
            <div className="relative w-full max-w-[230px] border max-h-[150px] min-h-[150px] border-black p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">

              <div className="flex justify-center items-center bg-[#FCA311] w-14 h-14 rounded-full border-4 border-white -mt-8 mb-4 z-10 mx-auto">
                <span className="text-white text-2xl font-semibold">1</span>
              </div>
              <h3 className="font-semibold text-base mb-2"> Submit Request</h3>
              <p className="text-gray-700 text-sm">You can Submit your request.</p>
            </div>

            {/* Arrow Line to next process */}
            <div className="relative flex items-center justify-center">
              <span className="text-black text-2xl md:rotate-0 rotate-90">➔</span>
            </div>

            {/* Process Box 2 */}
            <div className="relative w-full max-w-[230px] border max-h-[150px] min-h-[150px] border-black p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex justify-center items-center ml-10 bg-[#FCA311] w-12 h-12 rounded-full border-4 border-white -mt-8 mb-2 z-10">
                <span className="text-white text-2xl font-semibold">2</span>
              </div>
              <h3 className="font-semibold text-base mb-2">Request Queue</h3>
              <p className="text-gray-700 text-sm">You can check current requests</p>
            </div>

            {/* Arrow Line to next process */}
            <div className="relative flex items-center justify-center">
              <span className="text-black text-2xl md:rotate-0 rotate-90">➔</span>
            </div>

            {/* Process Box 3 */}
            <div className="relative w-full max-w-[230px] border max-h-[150px] min-h-[150px] border-black p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex justify-center items-center ml-10 bg-[#FCA311] w-12 h-12 rounded-full border-4 border-white -mt-8 mb-2 z-10">
                <span className="text-white text-2xl font-semibold">3</span>
              </div>
              <h3 className="font-semibold text-base mb-2">Inventory</h3>
              <p className="text-gray-700 text-sm">You Can check the availability Of items.</p>
            </div>

            {/* Arrow Line to next process */}
            <div className="relative flex items-center justify-center">
              <span className="text-black text-2xl md:rotate-0 rotate-90">➔</span>
            </div>

            {/* Process Box 4 */}
            <div className="relative w-full  max-w-[230px]  max-h-[150px] min-h-[150px] border border-black p-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex justify-center items-center ml-10 bg-[#FCA311] w-12 h-12 rounded-full border-4 border-white -mt-8 mb-2 z-10">
                <span className="text-white text-2xl font-semibold">4</span>
              </div>
              <h3 className="font-semibold text-base mb-2">Donate</h3>
              <p className="text-gray-700 text-sm">You can donate now!.</p>
            </div>
          </div>
        </div>
     </section>

      <section className="bg-[#F7F7F7] py-16">
        <div className=" mx-auto text-center px-4 md:px-0">
          <h2 className="text-3xl font-semibold">Our Items</h2>
          <h2 className="text-4xl font-semibold mt-4">We Believe that we can Eradicate</h2>
          <h2 className="text-4xl font-semibold mt-2">
            <span className="text-[#FCA311]">Poverty</span> With You
          </h2>

          {/* Images Section */}
          <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Image 1 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src="/Assets/chil2.webp" alt="Item 1" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Food</p>
              <p>Helping improve their health and quality of life. </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 2 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src="/Assets/chill3.webp" alt="Item 2" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Cloths</p>
              <p>By donating clothes, we can make a meaningful difference in the lives</p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 3 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src="/Assets/chil4.jpg" alt="Item 3" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Education</p>
              <p>Access to education a pathway to a brighter future. </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 4 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 mx-2">
              <img src="/Assets/chil5.jpg" alt="Item 4" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Medical</p>
              <p>Providing medical support improves health outcomes for those in need.</p>
            </div>
          </div>

          {/* Repeat Image Section (if needed) */}
          <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Image 1 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src="/Assets/chil2.webp" alt="Item 1" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Toys</p>
              <p>Helping the poor is a vital act of compassion</p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 2 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src="/Assets/chill3.webp" alt="Item 2" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Games Kit</p>
              <p>Helping the poor is a vital act of compassion</p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 3 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src="/Assets/chil4.jpg" alt="Item 3" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Cash</p>
              <p>Helping the poor is a vital act of compassion</p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 4 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 mx-2">
              <img src="/Assets/chil5.jpg" alt="Item 4" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Water Supply</p>
              <p>Helping the poor is a vital act of compassion</p>
            </div>
          </div>
          <Link to="/DonateNow">
            <button className="text-white bg-[#FCA311] px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg">
              Donate
            </button>
          </Link>
        </div>
      </section>

      <section className="bg-[#FCA311] py-16">
        <div className="container mx-auto text-left px-4 md:px-0">
          <h2 className="text-2xl text-start w-full md:text-3xl lg:text-4xl font-semibold mt-4 md:w-1/2">
            How we spend your <br />
            <span className="">donations and where it goes</span>
          </h2>

          {/* Flex container to align text and chart */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-0">
            {/* Text Section */}
            <div className="w-full md:w-1/1 text-left mb-6 md:mb-0">
              <p className="text-base mb-20">We understand that when you make a donation, you want to know exactly where your money is going and we pledge to be transparent.</p>
              <ul className="flex flex-wrap space-x-0 mb-10">
                {/* First three items in one horizontal line */}
                <li className="w-full sm:w-1/2 lg:w-1/3 flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#03318C' }}></div>
                  <strong className="ml-2">40% Child Care Home</strong>
                </li>
                <li className="w-full sm:w-1/2 lg:w-1/3 flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full " style={{ backgroundColor: '#EE0072' }}></div>
                  <strong className="ml-2">30% Cleanness Program</strong>
                </li>
                <li className="w-full sm:w-1/2 lg:w-1/3 flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full " style={{ backgroundColor: '#7D5B0C' }}></div>
                  <strong className="ml-2">10% Helping people</strong>
                </li>

                {/* Last two items in the next line, each taking half width */}
                <li className="w-full sm:w-1/2 lg:w-1/3 flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#CE5E94' }}></div>
                  <strong className="ml-2">10% excursions</strong>
                </li>
                <li className="w-full sm:w-1/2 lg:w-1/3 flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full " style={{ backgroundColor: '#FFFBEF' }}></div>
                  <strong className="ml-2">5% Feeding poor</strong>
                </li>
              </ul>

            </div>

            {/* Chart Section */}
            <div className="w-full md:w-1/3 flex justify-center md:flex-grow-0">
              <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">
                <DonutChart />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-[#F7F7F7] py-16">
        <div className="container mx-auto text-center px-6 md:px-0">
          <h2 className="text-3xl font-bold sm:text-xl lg:text-4xl">You Can Contribute!</h2>
          <p className="mt-4 text-base sm:text-sm md:text-lg">
            We can make a meaningful impact in the lives of those who are less fortunate.
          </p>
          <p className="mtext-base sm:text-sm md:text-lg">
            Together, we can work towards a world where everyone has access to the resources
          </p>
          <p className=" text-base sm:text-sm md:text-lg">
            they need to thrive.
          </p>
          <div className="mt-8">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index} className="relative">
                  {/* Image container */}
                  <img
                    src={img.src}
                    alt={`Slide ${index + 1}`}
                    className="w-full  sm:w-[70%] md:w-[60%] lg:w-[90%] mx-auto h-80 object-cover rounded-lg shadow-lg"
                  />

                  {/* Text container that overlaps the image */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-8/12 md:w-6/12 lg:w-8/12 bg-white text-black text-center py-4 px-6 shadow-lg border border-gray-300">
                    {/* Location Badge on the Border */}
                    <div className="absolute bottom-16 left-0 bg-[#14213D] text-white text-xs font-semibold py-1 px-3 rounded-tl-lg flex items-center space-x-2 border border-gray-300">
                      <FontAwesomeIcon icon={faLocationPin} className="w-4 h-4" />
                      <span>{img.location}</span>
                    </div>

                    {/* Text Content */}
                    <p className="text-sm text-left">{img.title}</p>
                    <p className="text-sm">{img.description}</p>

                    <div className="absolute top-15 left-0 bg-[#14213D] text-white text-xs font-semibold py-1  px-3 rounded-lg">
                      <button className="text-white font-semibold text-xs">Donet Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

      </section>

      <section className="py-16 bg-[#F7F7F7]">
        {/* Heading "Our Programs" */}
        <div className="container mx-auto px-6 md:px-0 text-left">
          <h2 className="text-3xl font-bold sm:text-xl lg:text-4xl">Our Programs</h2>

        </div>

        {/* Rectangular Boxes */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 mx-auto container px-6 md:px-0">
          {/* First Box */}
          <div className="flex flex-col items-center bg-[#FFBA48] text-black py-4 px-6 rounded-lg w-full sm:w-[400px] h-[150px]">
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
                <Link to="/program">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Second Box */}
          <div className="flex flex-col items-center bg-[#FFBA48] text-black py-4 px-6 rounded-lg w-full sm:w-[400px] h-[150px]">
            {/* Date and Two Headings */}
            <div className="flex justify-between w-full items-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-semibold">24</span>
                <span className="text-xl">APR</span>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="text-sm text-center">Next Program</h3>
                <h4 className="text-lg font-bold text-center">Lets Run for senior citizens</h4>
              </div>
              {/* Circular 'Next' Arrow Button */}
              <div className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full cursor-pointer">
                <Link to="/program">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;