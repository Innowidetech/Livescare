import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching admin blogs
export const fetchAdminBlog = createAsyncThunk(
  'blogs/fetchAdminBlog',
  async (blogId) => {
    const response = await fetch(`https://livescare.onrender.com/api/admin/blog/${blogId}`);
    const data = await response.json();
    return data;
  }
);

// Async thunk for fetching user blogs
export const fetchUserBlogs = createAsyncThunk(
  'blogs/fetchUserBlogs',
  async () => {
    const response = await fetch('https://livescare.onrender.com/api/user/blog');
    const data = await response.json();
    return data.blogs; // Extract the blogs array from the response
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    userBlogs: [],
    currentBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.userBlogs = action.payload;
        state.error = null;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAdminBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;