import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage1 = () => {
  return (
    <>
      <div className="py-20 px-8 sm:px-12 md:px-16 lg:px-28">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl text-start font-bold text-black mb-8">
            Mission Smile 1k: Outdoor charity outreach
          </h2>
          
          {/* Paragraph */}
          <p className="text-sm md:text-base text-gray-700 mb-8 text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut tristique massa. Sed felis est, consequat ac tellus non, luctus ultrices eros. Curabitur sit amet mollis libero, non dapibus lorem. Mauris vehicula, urna ac vehicula tristique, lectus enim cursus odio, sed viverra nisi libero nec enim.
          </p>
          <p className="text-sm md:text-base text-gray-700 mb-8 text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut tristique massa. Sed felis est, consequat ac tellus non, luctus ultrices eros. Curabitur sit amet mollis libero, non dapibus lorem. Mauris vehicula, urna ac vehicula tristique, lectus enim cursus odio, sed viverra nisi libero nec enim.
          </p>
          <p className="text-sm md:text-base text-gray-700 mb-8 text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut tristique massa. Sed felis est, consequat ac tellus non, luctus ultrices eros. Curabitur sit amet mollis libero, non dapibus lorem. Mauris vehicula, urna ac vehicula tristique, lectus enim cursus odio, sed viverra nisi libero nec enim.
          </p>
          
          {/* Image */}
          <div className="relative overflow-hidden shadow-lg rounded-lg mb-8">
            <img
              src="Assets/blogpage1.jfif"
              alt="Blog Image"
              className="w-full h-52 object-cover rounded-lg"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl text-start font-bold text-black mb-8">
            Contribute
          </h2>

          {/* Paragraph */}
          <p className="text-sm md:text-base text-gray-700 mb-8 text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut tristique massa. Sed felis est, consequat ac tellus non, luctus ultrices eros. Curabitur sit amet mollis libero, non dapibus lorem. Mauris vehicula, urna ac vehicula tristique, lectus enim cursus odio, sed viverra nisi libero nec enim.
          </p>
          <p className="text-sm md:text-base text-gray-700 mb-8 text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut tristique massa. Sed felis est, consequat ac tellus non, luctus ultrices eros. Curabitur sit amet mollis libero, non dapibus lorem. Mauris vehicula, urna ac vehicula tristique, lectus enim cursus odio, sed viverra nisi libero nec enim.
          </p>

          <ul className="text-sm md:text-base text-mb-8 text-black font-semibold text-start list-inside list-disc ">
            <li>Time can help us reach more people in need.</li>
            <li>Your experiences can inspire others and highlight the importance of our mission.</li>
            <li>Making a one-time donation or setting up a recurring monthly contribution.</li>
          </ul>
          <p className="text-sm md:text-base text-gray-700 mb-8 text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut tristique massa. Sed felis est, consequat ac tellus non, luctus ultrices eros. Curabitur sit amet mollis libero, non dapibus lorem. Mauris vehicula, urna ac vehicula tristique, lectus enim cursus odio, sed viverra nisi libero nec enim.
          </p>
        </div>
      </div>

      <section className="flex flex-col lg:flex-row items-center space-y-8 lg:space-x-8 lg:space-y-0 p-8">
                      <div className="w-full lg:w-1/5">
                          <img
                              src="Assets/chil1.jpg"
                              alt="Placeholder"
                              className="w-full h-48 sm:h-64 md:h-80 lg:h-60 object-cover"
                          />
                      </div>
                      <div className="w-full lg:w-4/5 border border-orange-300 p-3">
                          <h2 className="text-2xl font-semibold mb-4">Mission Smile 1k: Outdoor Charity</h2>
                          <p className="text-lg">
                              Eyelash extensions are a popular beauty trend that involves attaching synthetic or natural fibers to your natural lashes to make them look longer, fuller, and more glamorous. They can last for several weeks or months, depending on the type, quality, and maintenance of the extensions. Eyelash extensions can enhance your appearance and boost your confidence, but they also require some care and
                          </p>
                          <Link
                              to="/blogpage1" // This is the target route
                              className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300 inline-block mt-4"
                          >
                              Learn More
                          </Link>
                      </div>
                  </section>
                  <section className="flex flex-col lg:flex-row items-center space-y-8 lg:space-x-8 lg:space-y-0 p-8">
                      <div className="w-full lg:w-1/5">
                          <img
                              src="Assets/chil1.jpg"
                              alt="Placeholder"
                              className="w-full h-48 sm:h-64 md:h-80 lg:h-60 object-cover"
                          />
                      </div>
                      <div className="w-full lg:w-4/5 border border-orange-300 p-3">
                          <h2 className="text-2xl font-semibold mb-4">Mission Smile 1k: Outdoor Charity</h2>
                          <p className="text-lg">
                              Eyelash extensions are a popular beauty trend that involves attaching synthetic or natural fibers to your natural lashes to make them look longer, fuller, and more glamorous. They can last for several weeks or months, depending on the type, quality, and maintenance of the extensions. Eyelash extensions can enhance your appearance and boost your confidence, but they also require some care and
                          </p>
                          <Link
                              to="/blogpage1" // This is the target route
                              className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300 inline-block mt-4"
                          >
                              Learn More
                          </Link>
                      </div>
                  </section>
    </>
  );
};

export default BlogPage1;