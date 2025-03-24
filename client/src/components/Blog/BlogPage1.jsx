import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminBlog, fetchUserBlogs } from '../../redux/homeblogs';

const BlogPage1 = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBlog, userBlogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminBlog(id));
    }
    dispatch(fetchUserBlogs());
  }, [dispatch, id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!currentBlog) return <div className="text-center py-8">Blog not found</div>;

  // console.log(currentBlog)

  return (
    <>
      {/* <div className="">
        <div className="text-center">
          <h2 className="text-3xl text-start font-medium text-black mb-8">
            {currentBlog.title}
          </h2>
          
          <p className="text-sm md:text-base text-gray-700 mb-8 text-start">
            {currentBlog.description}
          </p>
          
          <div className=" overflow-hidden mb-8">
            <img
              src={currentBlog.image || "Assets/blogpage1.jfif"}
              alt={currentBlog.title}
              className="w-full h-52 object-cover rounded-lg"
            />
          </div>
        </div>
      </div> */}
      <div className='min-h-screen max-w-7xl mx-auto p-12 mt-8'>
      <div className="">
  <h2 className="text-3xl text-start font-medium text-black mb-8 ">
    {currentBlog.blog.title}
  </h2>
  <p className="text-lg text-[#525560]">
    {currentBlog.blog.description.replace(/<[^>]*>/g, '')}
  </p>
  <div className="flex justify-center py-10">
    <img
      src={currentBlog.blog.image}
      alt=""
      className="md:w-[350px] lg:w-[500px]"
    />
  </div>
</div>

          

      </div>
    </>
  );
};

export default BlogPage1;