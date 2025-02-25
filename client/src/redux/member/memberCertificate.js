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

export const updateCertificate = createAsyncThunk(
  'certificates/update',
  async ({ certificateId, updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `https://livescare.onrender.com/api/member/updateCertificateStatus/${certificateId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteCertificate = createAsyncThunk(
  'certificates/delete',
  async (certificateId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://livescare.onrender.com/api/member/certificate/${certificateId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return certificateId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateCertificateStatus = createAsyncThunk(
  'certificates/updateStatus',
  async ({ certificateId, newStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `https://livescare.onrender.com/api/member/updateCertificateStatus/${certificateId}/${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { certificateId, newStatus };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const certificateSlice = createSlice({
  name: 'certificates',
  initialState: {
    certificates: {
      certificates: []
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
        state.certificates = action.payload;
        state.error = null;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch certificates';
      })
      .addCase(updateCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.certificates = state.certificates.certificates.map(cert =>
          cert._id === action.payload._id ? action.payload : cert
        );
        state.error = null;
      })
      .addCase(updateCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update certificate';
      })
      .addCase(deleteCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.certificates = state.certificates.certificates.filter(
          cert => cert._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete certificate';
      })
      .addCase(updateCertificateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCertificateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { certificateId, newStatus } = action.payload;
        state.certificates.certificates = state.certificates.certificates.map(cert =>
          cert._id === certificateId ? { ...cert, status: newStatus } : cert
        );
        state.error = null;
      })
      .addCase(updateCertificateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update certificate status';
      });
  },
});

export const { clearError } = certificateSlice.actions;
export default certificateSlice.reducer;