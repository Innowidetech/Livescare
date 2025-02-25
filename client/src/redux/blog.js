import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://livescare.onrender.com/api/admin/blog';

// Async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const validBlogs = (response.data.blogs || []).filter(blog => blog && typeof blog === 'object');
      return validBlogs;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch blogs');
    }
  }
);

// Async thunk for creating a new blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      const tagsString = Array.isArray(blogData.tags) 
        ? blogData.tags.join(',') 
        : blogData.tags;

      formData.append('title', blogData.title);
      formData.append('tags', tagsString);
      formData.append('description', blogData.description);
      formData.append('photo', blogData.image);

      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.blog;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create blog');
    }
  }
);

// Async thunk for deleting a blog
export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return blogId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete blog');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.filter(blog => blog && typeof blog === 'object');
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.blogs = [];
      })
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && typeof action.payload === 'object') {
          state.blogs = [action.payload, ...state.blogs.filter(Boolean)];
        }
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = blogSlice.actions;
export default blogSlice.reducer;