import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'Server error occurred');
  } else if (error.request) {
    throw new Error('No response received from server');
  } else {
    throw new Error('Error setting up the request');
  }
};

export const fetchCertificates = createAsyncThunk(
  'certificates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://livescare.onrender.com/api/member/certificate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const certificateSlice = createSlice({
  name: 'certificates',
  initialState: {
    certificates: {
      certificates: []  // Match the nested structure from the API
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload; // Store the entire response
        state.error = null;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch certificates';
      });
  },
});

export const { clearError } = certificateSlice.actions;
export default certificateSlice.reducer;
