import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'; // Import the Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Slider from 'react-slick'; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css";  // Import Slick CSS
import "slick-carousel/slick/slick-theme.css";  // Import Slick Theme CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrograms } from '../redux/homepagePrograms';
import { fetchDonationData } from '../redux/homepiechat';
import Food from '../Assets/SlideChil1.png';
import Meals from '../Assets/SlideChil2.png';
import Education from '../Assets/SlideChil3.webp';
import Medical from '../Assets/SlideChil4.jpg'
import circleImage from '../Assets/happychill.jpg';
import NutriciousMeal from '../Assets/1.png';
import HealthCare from '../Assets/2.png';
import Educationall from '../Assets/3.png';
import Food1 from '../Assets/food.png';
import Clothes from '../Assets/6.png';
import Books from '../Assets/11.png';
import MedicalLeave from '../Assets/chil5.jpg';
import Toys from '../Assets/toys.png';
import Finacial from '../Assets/finance.png';
import GamesKit from '../Assets/Gamekits.png';
import Other from '../Assets/other.png';




ChartJS.register(ArcElement, Tooltip, Legend);



const DonutChart = ({ donationData = [] }) => {
  const labels = donationData.map(item => item.category);
  const values = donationData.map(item => item.percentage);
  const colors = [
    '#03318C', '#EE0072', '#7D5B0C', '#CE5E94', '#FFFBEF',
    '#FF6B6B', '#4ECDC4', '#45B7D1'  // Added more colors for additional categories
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Donation Distribution',
        data: values,
        backgroundColor: colors.slice(0, values.length),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      },
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};




const HomePage = () => {
  const dispatch = useDispatch();
  const programsState = useSelector((state) => state.programs);
  const { programs = [], loading = false } = programsState || {};
  const { donationData = [], loading: donationLoading } = useSelector(state => state.donations);

  useEffect(() => {
    dispatch(fetchPrograms());
    dispatch(fetchDonationData());
  }, [dispatch]);


  // console.log(donationData)

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
      src: Food,
      title: "Food for the Poor",
      description: "Target: ₹2,00,000 | Every contribution ensures meals for those in need.",
      location: "Mumbai"
    },
    {
      src: Meals,
      title: "Daily Meals for Senior Citizens",
      description: "Target: ₹2,00,000 | Support us in providing nourishment for elderly.",
      location: "Bihar"
    },
    {
      src: Education,
      title: "Education for Underprivileged Children",
      description: "Target: ₹2,00,000 | Help us provide learning resources for children.",
      location: "Pune"
    },
    {
      src: Medical,
      title: "Medical Aid for Vulnerable Communities",
      description: "Target: ₹2,00,000 | Contribute to essential healthcare services treatments.",
      location: "Hyderabad"
    }
  ];


  const [selectedSection, setSelectedSection] = useState('healthyFood');

  const safeDonationData = Array.isArray(donationData) ? donationData : [];

  return (
    <div>
      {/* Background Image and Text Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/HomeChil.avif)' }}>
        <div className="relative z-10 flex items-center justify-center sm:justify-center h-full px-6 text-white">
          <div className="max-w-lg text-center sm:text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 continuousAnimation">
              We Can Make
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 continuousAnimation delay-1">
              <span className>a Difference</span>
            </h1>

            <Link to="/registration">  {/* Link to registration page */}
  <button className="bg-[#FCA311] px-6 py-2 rounded-md font-bold text-base sm:text-lg hover:bg-orange-600 animate-move">
    Join With Us
  </button>
</Link>

          </div>
        </div>
      </section>


      {/* White Background Container with Centered Heading */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold animate-slideInFromLeft">
            Welcome to <span className="text-[#FCA311]">LivesCare</span>
          </h2>
          <h2 className="text-4xl font-semibold mt-4 animate-slideInFromLeft">
            Empowering Lives, One Step at a Time
          </h2>
        </div>
      </section>

      {/* Circle with Text Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between relative px-6 sm:px-10 lg:px-24 py-8">
        {/* Circle with Specific Styles */}
        <div className="w-[250px] sm:w-[250px] md:w-[350px] lg:w-[400px] h-[250px] sm:h-[250px] md:h-[350px] lg:h-[400px] bg-[#FCA311] rounded-full mb-4 sm:mb-0 sm:mr-8 animate-pulse">
  <div className="w-full h-full flex justify-center items-center">
    <img
      src={circleImage}
      alt="Circle Content"
      className="w-64 h-64 object-cover rounded-full"
    />
  </div>
</div>


        {/* Text and Headings Section */}
        <div className="text-lg sm:text-left max-w-lg px-6 sm:px-0">
          {/* Three Headings Horizontally with Underlines as Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mb-6 animate-slideInFromRight">
            <h3
              className={`text-xl font-bold pb-2 cursor-pointer ${selectedSection === 'healthyFood'
                ? 'text-[#FCA311] border-b-2 border-[#FCA311]'
                : 'text-black border-b-2 border-transparent hover:text-[#FCA311] hover:border-[#FCA311]'
                }`}
              onClick={() => setSelectedSection('healthyFood')}
            >
              Nutritious Meals
            </h3>
            <h3
              className={`text-xl font-bold pb-2 cursor-pointer ${selectedSection === 'medicalFacilities'
                ? 'text-[#FCA311] border-b-2 border-[#FCA311]'
                : 'text-black border-b-2 border-transparent hover:text-[#FCA311] hover:border-[#FCA311]'
                }`}
              onClick={() => setSelectedSection('medicalFacilities')}
            >
              Healthcare Support
            </h3>
            <h3
              className={`text-xl font-bold pb-2 cursor-pointer ${selectedSection === 'educationFacilities'
                ? 'text-[#FCA311] border-b-2 border-[#FCA311]'
                : 'text-black border-b-2 border-transparent hover:text-[#FCA311] hover:border-[#FCA311]'
                }`}
              onClick={() => setSelectedSection('educationFacilities')}
            >
              Education for All
            </h3>
          </div>

          {/* Conditional Paragraph based on selected section */}
          <p className="mb-8 animate-slideInFromLeft">
            {selectedSection === 'healthyFood' &&
              'Proper nutrition is essential for a healthy life. We are committed to providing balanced, nutrient-rich meals to underprivileged communities, ensuring they receive the nourishment needed for growth, strength, and overall well-being.'}

            {selectedSection === 'medicalFacilities' &&
              'Access to proper healthcare is a fundamental right. We strive to provide medical assistance and essential health services to underserved communities, ensuring they receive timely care and treatment for a healthier future.'}

            {selectedSection === 'educationFacilities' &&
              'Education is the key to unlocking potential. By providing access to learning opportunities, we help build brighter futures.'}
          </p>

          {/* Conditional Content Display based on selected section */}
          <div className="mt-8 animate-slideInFromRight">
            {selectedSection === 'healthyFood' && (
              <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Left Side Image */}
                <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
                  <img
                    src={NutriciousMeal}
                    alt="Image Description"
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>

                {/* Right Side Text (Bullet Points) */}
                <div className="w-full sm:w-1/2 text-lg sm:text-left px-6 sm:px-0">
                  <ul className="list-disc list-inside">
                    <li className="mb-2">Delivering wholesome meals to individuals and families facing food insecurity.</li>
                    <li className="mb-2">Implementing long-term solutions to combat hunger and malnutrition.</li>
                    <li className="mb-2">Improving health and well-being through accessible, nutritious food.</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedSection === 'medicalFacilities' && (
              <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Left Side Image */}
                <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
                  <img
                    src={HealthCare}
                    alt="Image Description"
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>

                {/* Right Side Text (Bullet Points) */}
                <div className="w-full sm:w-1/2 text-lg sm:text-left px-6 sm:px-0">
                  <ul className="list-disc list-inside">
                    <li className="mb-2">Offering free check-ups, treatments, and medications to those in need.</li>
                    <li className="mb-2">Educating communities on preventive care and wellness.</li>
                    <li className="mb-2">Providing immediate medical support during crises.</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedSection === 'educationFacilities' && (
              <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Left Side Image */}
                <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
                  <img
                    src={Educationall}
                    alt="Image Description"
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>

                {/* Right Side Text (Bullet Points) */}
                <div className="w-full sm:w-1/2 text-lg sm:text-left px-6 sm:px-0">
                  <ul className="list-disc list-inside">
                    <li className="mb-2">Effortlessly support our causes with user-friendly donation options.</li>
                    <li className="mb-2">Easily keep track of your contributions and impact.</li>
                    <li className="mb-2">Opt for one-time or monthly donations to support our initiatives.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="bg-white py-16 mx-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">How We Work</h2>

          {/* Process Boxes Section */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-6">

            {/* Process Box 1 */}
            <div className="relative w-full max-w-[260px] h-[265px] border-2 border-black p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex justify-center items-center bg-[#FCA311] w-14 h-14 rounded-full border-4 border-white -mt-8 mb-4 z-10 mx-auto">
                <span className="text-white text-2xl font-semibold">1</span>
              </div>
              <h3 className="font-semibold text-base mb-2">Submit Your Request</h3>
              <p className="text-gray-700 md:text-xs lg:text-lg break-words">Share your requirements with us, and we'll evaluate how we can help.</p>
            </div>

            {/* Arrow Line to next process */}
            <div className="relative flex items-center justify-center">
              <span className="text-black text-2xl md:rotate-0 rotate-90">➔</span>
            </div>

            {/* Process Box 2 */}
            <div className="relative w-full max-w-[260px] h-[265px] border-2 border-black p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex justify-center items-center bg-[#FCA311] w-14 h-14 rounded-full border-4 border-white -mt-8 mb-4 z-10 mx-auto">
                <span className="text-white text-2xl font-semibold">2</span>
              </div>
              <h3 className="font-semibold text-base mb-2">Request Queue</h3>
              <p className="text-gray-700 md:text-xs lg:text-lg break-words">Stay updated on the progress of requests and pending needs.</p>
            </div>

            {/* Arrow Line to next process */}
            <div className="relative flex items-center justify-center">
              <span className="text-black text-2xl md:rotate-0 rotate-90">➔</span>
            </div>

            {/* Process Box 3 */}
            <div className="relative w-full max-w-[260px] h-[265px] border-2 border-black p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex justify-center items-center bg-[#FCA311] w-14 h-14 rounded-full border-4 border-white -mt-8 mb-4 z-10 mx-auto">
                <span className="text-white text-2xl font-semibold">3</span>
              </div>
              <h3 className="font-semibold text-base mb-2">Inventory Tracking</h3>
              <p className="text-gray-700 md:text-xs lg:text-lg break-words">Check the availability of resources and supplies to address ongoing needs.</p>
            </div>

            {/* Arrow Line to next process */}
            <div className="relative flex items-center justify-center">
              <span className="text-black text-2xl md:rotate-0 rotate-90">➔</span>
            </div>

            {/* Process Box 4 */}
            <div className="relative w-full max-w-[260px] h-[265px] border-2 border-black p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex justify-center items-center bg-[#FCA311] w-14 h-14 rounded-full border-4 border-white -mt-8 mb-4 z-10 mx-auto">
                <span className="text-white text-2xl font-semibold">4</span>
              </div>
              <h3 className="font-semibold text-base mb-2">Make a Donation</h3>
              <p className="text-gray-700 md:text-xs lg:text-lg break-words">Contribute to our mission and bring hope to countless lives.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-[#F7F7F7] py-16">
        <div className=" mx-auto text-center px-4 md:px-0">
          <h2 className="text-3xl font-semibold">Our Items</h2>
          <h2 className="text-4xl font-semibold mt-4">We believe that together, we can eliminate</h2>
          <h2 className="text-4xl font-semibold mt-2">
            <span className="text-[#FCA311]">Poverty</span> and create a better future.
          </h2>

          {/* Images Section */}
          <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Image 1 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src={Food1} alt="Item 1" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Food</p>
              <p> Delivering nutritious meals to combat hunger and promote health.

              </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 2 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src={Clothes} alt="Item 2" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Clothes</p>
              <p> Offering comfort and dignity with essential apparel.

              </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 3 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src={Books} alt="Item 3" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Books</p>
              <p>Enriching minds with education for a brighter future.


              </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 4 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 mx-2">
              <img src={MedicalLeave} alt="Item 4" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Medical Aid</p>
              <p> Providing crucial healthcare for those in need.


              </p>
            </div>
          </div>

          {/* Repeat Image Section (if needed) */}
          <div className="flex flex-wrap justify-between items-center mt-12 space-y-8 md:space-y-0 md:flex-nowrap">
            {/* Image 1 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src={Toys} alt="Item 1" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Toys </p>
              <p>Bringing happiness to children through meaningful play.

              </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 2 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src={Finacial} alt="Item 2" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Financial Support              </p>
              <p>Funding initiatives to uplift communities.
              </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 3 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 relative mx-2">
              <img src={GamesKit} alt="Item 3" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Games Kit </p>
              <p> Fostering creativity and development through interactive fun.
              </p>
            </div>

            {/* Vertical Line */}
            <div className="hidden md:block h-48 border-l-4 border-[#FCA311] mx-2"></div>

            {/* Image 4 */}
            <div className="flex flex-col items-center w-full md:w-1/5 pb-6 md:pb-0 mx-2">
              <img src={Other} alt="Item 4" className="w-60 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg font-semibold">Other Essentials
              </p>
              <p>Supplying vital hygiene and emergency relief items.

              </p>
            </div>
          </div>
          <Link to="/DonateNow">
            <button className="text-white bg-[#FCA311]  hover:bg-orange-600  px-10 py-2 mt-10 md:mt-10 lg:mt-20 rounded-md shadow-gray-600 shadow-lg">
              Donate
            </button>
          </Link>
        </div>
      </section>

      {/* <section className="bg-[#Ffba48] py-16">
  <div className="px-6 md:mx-8 text-left">
    <h2 className="text-2xl text-start w-full md:text-3xl lg:text-4xl font-semibold mt-4 ">
      Transparency in Donations
    </h2>

    <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-0">
      <div className="w-full text-left mb-6 md:mb-0">
        <p className="text-base mb-20">
          Your trust is invaluable to us. Here's how we allocate your generous contributions:
        </p>
        {donationLoading ? (
          <p>Loading donation data...</p>
        ) : (
          <ul className="flex flex-wrap space-x-0 mb-10">
            {donationData.map((item, index) => (
              <li key={index} className="w-full sm:w-1/2 lg:w-1/3 flex items-center mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: ['#03318C', '#EE0072', '#7D5B0C', '#CE5E94', '#FFFBEF', '#FF6B6B', '#4ECDC4', '#45B7D1'][index] }}
                ></div>
                <strong className="ml-2">{item.percentage}% {item.category}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-full md:w-[calc(33.3333%-16px)] flex justify-center md:flex-grow-0">
        <div className="w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px]">
          <DonutChart donationData={donationData} />
        </div>
      </div>
    </div>
  </div>
</section> */}

<section className="bg-[#Ffba48] py-16">
  <div className="flex flex-col md:flex-row px-6 md:mx-8 justify-between items-center">
    <div className="w-full md:w-2/3 text-left mb-6 md:mb-0">
      <h2 className="text-center md:text-left text-xl md:text-3xl lg:text-4xl font-semibold mt-4 py-10">
        Transparency in Donations
      </h2>
      <p className="text-base mb-6 text-center md:text-left">
        Your trust is invaluable to us. Here's how we allocate your generous contributions:
      </p>
      {donationLoading ? (
        <p>Loading donation data...</p>
      ) : (
        <ul className="flex flex-wrap gap-4">
          {donationData.map((item, index) => (
            <li key={index} className="w-full sm:w-1/2 lg:w-1/3 flex items-center mb-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: [
                    '#03318C',
                    '#EE0072',
                    '#7D5B0C',
                    '#CE5E94',
                    '#FFFBEF',
                    '#FF6B6B',
                    '#4ECDC4',
                    '#45B7D1',
                  ][index],
                }}
              ></div>
              <strong className="ml-2">{item.percentage}% {item.category}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="w-full flex justify-start md:justify-end">
      <div className="w-full max-w-[350px]">
        <DonutChart donationData={donationData} />
      </div>
    </div>
  </div>
</section>

<section className="bg-[#F7F7F7] py-16">
  <div className="container mx-auto text-center px-6 md:px-0 relative">
    <h2 className="text-3xl font-bold sm:text-xl lg:text-4xl">You Can Contribute!</h2>
    <p className="mt-4 text-base sm:text-sm md:text-lg">
      We can make a meaningful impact in the lives of those who are less fortunate.
    </p>
    <p className="mt-2 text-base sm:text-sm md:text-lg">
      Together, we can work towards a world where everyone has access to the resources
    </p>
    <p className="mt-2 text-base sm:text-sm md:text-lg">
      they need to thrive.
    </p>
</div>
<div className="mt-8 mx-6">
  <Slider
    {...{
      ...settings, // Keep your existing settings
      arrows: false,  // Disables next/prev arrows
      autoplay: true,  // Enables automatic sliding
      autoplaySpeed: 3000,  // Set time interval for automatic sliding (3000ms = 3 seconds)
      speed: 1000,  // Set the sliding speed (1000ms = 1 second)
      pauseOnHover: false,  // Disables pausing the slider on hover
      responsive: [
        {
          breakpoint: 640, // Mobile devices
          settings: {
            slidesToShow: 1, // Show 1 image at a time
            slidesToScroll: 1, // Scroll 1 image at a time
            centerMode: true,  // Centers the image in the slider
            centerPadding: "0", // No padding on sides
          },
        },
        {
          breakpoint: 1024, // Tablets
          settings: {
            slidesToShow: 2, // Show 2 images at a time
            slidesToScroll: 2, // Scroll 2 images at a time
            centerMode: true,  // Centers the images in the slider
            centerPadding: "20px", // Adds padding around the images (for gap)
          },
        },
        {
          breakpoint: 1280, // Laptops
          settings: {
            slidesToShow: 3, // Show 3 images at a time
            slidesToScroll: 3, // Scroll 3 images at a time
            centerMode: true,  // Centers the images in the slider
            centerPadding: "20px", // Adds padding around the images (for gap)
          },
        },
      ],
    }}
  >
    {images.map((img, index) => (
      <div key={index} className="relative px-6"> 
        {/* Image container */}
        <img
          src={img.src}
          alt={`Slide ${index + 1}`}
          className="w-full object-cover rounded-lg"
        />

        {/* Text container that overlaps the image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full md:w-7/11 lg:w-2/3 bg-white text-black text-center py-4 px-6 z-10">
          {/* Location Badge: Positioned at the top-left corner of the white box */}
          <div className="absolute top-0 left-0 px-3 py-2 bg-[#14213D] text-white text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2">
            <FontAwesomeIcon icon={faLocationPin} className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-center text-xs sm:text-sm">{img.location}</span>
          </div>

          {/* Text Content */}
          <p className="text-xs sm:text-sm md:text-xs lg:text-base text-left mt-6 font-bold">{img.title}</p>
          <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-left">{img.description}</p>

          {/* Donate Now Button */}
          <div className="absolute bottom-0 left-0 bg-[#14213D] text-white text-xs font-semibold py-2 px-3">
            <Link to="/DonateNow">
              <button className="text-white font-semibold text-xs">Donate Now</button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>



</section>




      <section className="py-16 bg-[#F7F7F7]">
        <div className="px-6 md:px-0 text-center">
          <h2 className="text-3xl font-bold sm:text-xl lg:text-4xl">Our Programs</h2>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start md:mx-10 items-center gap-6 mt-8 px-6 md:px-0">
          {loading ? (
            <div className="text-center py-4">Loading programs...</div>
          ) : programs.length === 0 ? (
            <div className="text-center py-4">No programs available at the moment.</div>
          ) : (
            programs.map((program) => (
              <div key={program._id} className="flex flex-col items-center  bg-[#FFBA48] text-black py-4 px-6 rounded-lg w-full sm:w-[400px] h-[150px] mx-2">
                <div className="flex justify-between w-full items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-semibold">
                      {new Date(program.date).getDate()}
                    </span>
                    <span className="text-xl">
                      {new Date(program.date).toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    {/* <h3 className="text-sm text-center">Next Program</h3> */}
                    <h4 className="text-lg font-bold text-center">{program.title}</h4>
                    <p className="text-sm">{program.location}</p>
                  </div>
                  <div className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                    <Link to={`/program/${program._id}`}>
                      <button aria-label="View program details">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default HomePage;