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
      const response = await axios.get('https://livescare.onrender.com/api/admin/certificate', {
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

export const fetchDonors = createAsyncThunk(
  'certificates/fetchDonors',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://livescare.onrender.com/api/admin/donors', {
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

export const addCertificate = createAsyncThunk(
  'certificates/add',
  async (certificateData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const formData = new FormData();
      
      // Add the basic fields
      formData.append('donorName', certificateData.get('donorName'));
      formData.append('donationId', certificateData.get('donationId'));
      formData.append('issuedDate', certificateData.get('issuedDate'));
      
      // Get the signature file and append it as 'photo' instead of 'signature'
      const signatureFile = certificateData.get('signature');
      if (signatureFile) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(signatureFile.type)) {
          throw new Error('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (signatureFile.size > maxSize) {
          throw new Error('File size should be less than 5MB');
        }
        
        formData.append('photo', signatureFile);
      }

      const response = await axios.post(
        'https://livescare.onrender.com/api/admin/certificate',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

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
    donors: [],
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    }
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
      })
      .addCase(fetchDonors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.loading = false;
        state.donors = action.payload.donor;
        state.error = null;
      })
      .addCase(fetchDonors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch donors';
      })
      .addCase(addCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addCertificate.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we're adding to the nested certificates array
        if (!state.certificates.certificates) {
          state.certificates.certificates = [];
        }
        state.certificates.certificates.unshift(action.payload.newCertificate);
        state.successMessage = action.payload.message;
        state.error = null;
      })
      .addCase(addCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add certificate';
        state.successMessage = null;
      });
  },
});

export const { clearError, clearSuccessMessage } = certificateSlice.actions;
export default certificateSlice.reducer;