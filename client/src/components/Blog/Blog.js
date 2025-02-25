import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBlogs } from '../../redux/homeblogs';

// Helper function to truncate text to a specified word count
const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
        return { text: text };
    }
    const truncated = words.slice(0, wordLimit).join(' ') + '...';
    return { text: truncated };
};

const Blog = () => {
    const dispatch = useDispatch();
    const { userBlogs, loading, error } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchUserBlogs());
    }, [dispatch]);

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

    return (
        <div className="relative">
            <div className="bg-gray-50 min-h-[130vh] sm:min-h-[100vh] py-12 px-6 relative z-0">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:space-x-12">
                    <div className="flex-1">
                        <h2 className="text-3xl text-[#A1CB76] font-semibold text-left md:text-left mt-10 md:mb-0">
                            Blog
                        </h2>
                        <h2 className="text-2xl md:text-5xl text-black font-bold text-left md:text-left mt-8 md:mb-4 sm:pt-6">
                            Stay Connected with Our Latest Updates and Stories
                        </h2>
                        <p className='mt-6 md:mt-4 sm:pt-6 md:w-full text-base'>
                            Our blog is here to raise awareness, build credibility, and engage with our community. From inspiring success stories to impactful initiatives, we share insights and updates that not only inform but motivate. Together, we have the power to create a meaningful impact in the lives of those who require our support.
                        </p>
                    </div>

                    <div className="flex-1 p-2">
                        <div className="bg-[#FFC361] p-8 rounded-lg shadow-md flex flex-wrap mt-10 gap-3">
                            {userBlogs.slice(0, 3).map((blog) => {
                                const { text } = truncateText(blog.description.replace(/<[^>]*>/g, ''), 50);

                                return (
                                    <div
                                        key={blog._id}
                                        className="flex flex-col md:flex-row w-full items-center space-y-4 md:space-y-0"
                                    >
                                        <img
                                            src={blog.image || "Assets/gallery1.jfif"}
                                            alt={blog.title}
                                            className="w-full md:w-3/4 lg:w-1/3 h-auto rounded-lg object-cover"
                                        />
                                        <div className="text-center md:text-left md:ml-4">
                                            <h3 className="text-lg font-semibold">{blog.title}</h3>
                                            <p className="text-sm">{text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <style jsx>{`
  /* For screens 1000px or below (tablets, small laptops) */
  @media (max-width: 1000px) {
    .flex-col {
      flex-direction: column !important; /* Force column layout */
    }
    .w-full {
      width: 100% !important; /* Ensure full width */
    }
    .md:w-3/4 {
      width: 100% !important; /* Ensure full width on images */
    }
    .md:w-1/3 {
      width: 100% !important; /* Ensure full width on cards */
    }
    .md:ml-4 {
      margin-left: 0 !important; /* Remove left margin */
    }
    .text-center {
      text-align: center !important; /* Center text */
    }
  }
`}</style>

                </div>
            </div>

            {userBlogs.map((blog) => {
                const { text } = truncateText(blog.description, 50);

                return (
                    <section key={blog._id} className="flex flex-col lg:flex-row items-center space-y-8 lg:space-x-8 lg:space-y-0 p-8">
                        <div className="w-full lg:w-1/5">
                            <img
                                src={blog.image || "Assets/chil1.jpg"}
                                alt={blog.title}
                                className="w-full h-48 sm:h-64 md:h-80 lg:h-60 object-cover"
                            />
                        </div>
                        <div className="w-full lg:w-4/5  border-black border-2 p-6">
                            <h2 className="text-2xl font-semibold mb-4">{blog.title}</h2>
                            <p className="text-lg">{text}</p>
                            <Link
                                to={`/blogpage1/${blog._id}`}
                                className="bg-[#FCA311] text-white py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300 inline-block mt-4"
                            >
                                Learn More
                            </Link>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default Blog;
