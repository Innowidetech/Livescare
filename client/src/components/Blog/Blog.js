import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className="relative">
            {/* First container with appropriate height to avoid overlap */}
            <div className="bg-gray-50 min-h-[130vh] sm:min-h-[100vh] py-12 px-6 relative z-0">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
                    {/* Heading on the left */}
                    <div className="flex-1">
                        <h2 className="text-3xl text-[#A1CB76] font-semibold text-left md:text-left  md:mb-0 ">
                            Blog
                        </h2>
                        <h2 className="text-2xl md:text-5xl text-black font-bold text-left md:text-left mt-8 md:mb-4 sm:pt-6">
                            All our latest news and updates
                        </h2>
                        <p className='mt-6 md:mt-4 sm:pt-6 md:w-full text-base'>
                            Serving multiple purposes such as raising awareness, building credibility, engaging with audiences, and enhancing Together, we can make a difference in the lives of people in need. Together, we can make a difference in the lives of people in need.
                        </p>

                    </div>

                    {/* Paragraph on the right */}
                    <div className="flex-1 p-2">
                        {/* Box with images and text */}
                        <div className="bg-[#FFC361] p-8 rounded-lg shadow-md flex flex-wrap gap-3">

                            {/* Image 1 with text */}
                            <div className="flex flex-col md:flex-row w-full md:w-1/1 items-center space-y-4 md:space-y-0">
                                <img
                                    src="Assets/gallery1.jfif"
                                    alt="Image 1"
                                    className="w-full md:w-3/4 lg:w-1/3 h-auto rounded-lg object-cover"
                                />
                                <div className="text-center md:text-left md:ml-4">
                                    <h3 className="text-lg font-semibold">Autism care day</h3>
                                    <p className="text-sm text">lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.</p>
                                </div>
                            </div>

                            {/* Image 2 with text */}
                            <div className="flex flex-col md:flex-row w-full md:w-1/1 items-center space-y-4 md:space-y-0">
                                <img
                                    src="Assets/gallery1.jfif"
                                    alt="Image 2"
                                    className="w-full md:w-3/4 lg:w-1/3 h-auto rounded-lg object-cover"
                                />
                                <div className="text-center md:text-left md:ml-4">
                                    <h3 className="text-xl font-semibold">Down syndrome outreach</h3>
                                    <p className="text-sm">lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim.</p>
                                </div>
                            </div>

                            {/* Image 3 with text */}
                            <div className="flex flex-col md:flex-row w-full md:w-1/1 items-center space-y-4 md:space-y-0">
                                <img
                                    src="Assets/gallery1.jfif"
                                    alt="Image 3"
                                    className="w-full md:w-3/4 lg:w-1/3 h-auto rounded-lg object-cover"
                                />
                                <div className="text-center md:text-left md:ml-4">
                                    <h3 className="text-xl font-semibold">Caring for children with cerebral palsy</h3>
                                    <p className="text-sm">lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim..</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <section className="flex flex-col lg:flex-row items-center space-y-8 lg:space-x-8 lg:space-y-0  p-8">
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



        </div>
    );
};

export default Blog;