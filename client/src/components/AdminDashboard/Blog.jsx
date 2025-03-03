import React, { useEffect, useState } from 'react';
import { FileImage, Plus, BookOpen, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, createBlog, deleteBlog, resetSuccess } from '../../redux/blog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProfile} from "../../redux/adminprofile";
function Blog() {
  const dispatch = useDispatch();
  const { blogs, loading, error, success } = useSelector((state) => state.blog);
  const [activeView, setActiveView] = useState("all");
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  const { profile } = useSelector((state) => state.adminProfile);
  
  useEffect(() => {
     dispatch(getProfile());
   }, [dispatch]);
 
  
  useEffect(() => {
    if (success) {
      toast.success('Blog post created successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFormData({ title: '', tags: '', description: '', image: null });
      setActiveView("all");
      dispatch(fetchBlogs());
      dispatch(resetSuccess());
    }
    if (error) {
      toast.error(error.message || 'Something went wrong!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [success, error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(formData));
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await dispatch(deleteBlog(blogId)).unwrap();
        toast.success('Blog deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
        dispatch(fetchBlogs());
      } catch (error) {
        toast.error('Failed to delete blog', {
          position: "top-right",
          autoClose: 3000,
        });
        
      }
    }
  };

  const formatTags = (tags) => {
    if (!tags) return [];
    if (typeof tags === 'string') return tags.split(',');
    if (Array.isArray(tags)) {
      if (tags.length === 1 && typeof tags[0] === 'string') {
        return tags[0].split(',');
      }
      return tags;
    }
    return [];
  };

  const BlogCard = ({ blog }) => {
    if (!blog || typeof blog !== 'object') {
      return null;
    }

    const {
      _id = '',
      title = '',
      image = '',
      tags = [],
      description = ''
    } = blog;

    if (!_id) {
      console.warn('Blog post missing _id:', blog);
      return null;
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-2 md:p-6 mb-4 relative">

        <div className="mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div>
        <button
          onClick={() => handleDelete(_id)}
          className="absolute top-0 right-4 p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
          title="Delete blog"
        >
          <Trash2 className="md:hidden w-5 h-5" />
        </button>
        </div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-800">
              {title}
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {formatTags(tags).map((tag, index) => (
            <span
              key={`${_id}-${index}`}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
        <div 
          className="text-gray-600 line-clamp-3 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <button
          onClick={() => handleDelete(_id)}
          className="absolute bottom-4 right-4 p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
          title="Delete blog"
        >
          <Trash2 className="hidden md:block w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <div className="px-4 sm:px-6 lg:px-8 py-8 mt-10 md:mt-10">
      <h2 className="text-3xl mb-2 font-medium text-left" style={{fontFamily:'Inter'}}>Hi,<span className=""> {profile?.loggedinuser?.fullname} </span></h2>
        <h1 
          className="md:text-2xl font-medium text-[#202224] text-right mb-4"
          style={{fontFamily: 'Inter'}}
        >
          Blog
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-8 items-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView("all")}
              className={`flex items-center md:px-4 md:py-2 rounded-lg p-1 ${
                activeView === "all"
                  ? "bg-[#fca311] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } transition-colors duration-200`}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              All Blogs
            </button>
            <button
              onClick={() => setActiveView("add")}
              className={`flex items-center md:px-4 md:py-2 rounded-lg p-1 border border-[#fca311] ${
                activeView === "add"
                  ? "text-[#fca311]"
                  : "bg-white text-[#fca311] hover:bg-gray-50"
              } transition-colors duration-200`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Blog
            </button>
          </div>
        </div>

        {activeView === "all" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="text-center py-8 col-span-full">Loading blogs...</div>
            ) : Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.filter(blog => blog && blog._id).map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))
            ) : (
              <div className="text-center py-8 col-span-full text-gray-500">
                No blog posts found
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-3xl rounded-lg p-6">
            <h2 
              className="text-2xl font-medium mb-6"
              style={{ fontFamily: "Inter" }}
            >
              Upload Blog
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="tag1, tag2, tag3"
                  className="w-full px-3 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-[#fca311] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">
                  Image
                </label>
                <div className="relative border-2 border-dashed border-[#fca311] rounded-lg p-4 cursor-pointer">
                  <div className="flex items-center justify-center">
                    {formData.image ? (
                      <div className="text-sm text-gray-600">
                        File selected: {formData.image.name}
                      </div>
                    ) : (
                      <div className="text-center">
                        <FileImage className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      required
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#fca311] text-white py-2 px-4 rounded-md lg:w-64 flex justify-center items-center transition-colors duration-200 mx-auto"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Blog"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;