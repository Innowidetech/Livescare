import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://livescare.onrender.com/api/admin/donor';

const initialState = {
  donors: [],
  status: 'idle',
  error: null,
  selectedView: {
    place: 'city',
    contact: 'mobileNumber'
  }
};

export const fetchDonors = createAsyncThunk(
  'donor/fetchDonors',
  async ({ place, contact } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Build the URL with optional parameters
      let url = API_URL;
      if (place && contact) {
        url = `${API_URL}/${place}/${contact}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to fetch donors (${response.status})`
        );
      }
      
      const data = await response.json();
      
      if (!data) {
        return rejectWithValue('Invalid response format from server');
      }
      
      return data;
    } catch (error) {
      console.error('Fetch donors error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const updateDonorStatus = createAsyncThunk(
  'donor/updateDonorStatus',
  async ({ donorId, newStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`https://livescare.onrender.com/api/admin/updateDonorRequestStatus/${donorId}/${newStatus}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to update donor status (${response.status})`
        );
      }

      const data = await response.json();
      return { donorId, newStatus };
    } catch (error) {
      console.error('Update donor status error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const donorSlice = createSlice({
  name: 'donor',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedView: (state, action) => {
      state.selectedView = {
        ...state.selectedView,
        ...action.payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donors = action.payload;
        state.error = null;
      })
      .addCase(fetchDonors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.donors = [];
      })
      .addCase(updateDonorStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateDonorStatus.fulfilled, (state, action) => {
        const { donorId, newStatus } = action.payload;
        if (state.donors?.donors) {
          const donor = state.donors.donors.find(d => d.id === donorId);
          if (donor) {
            donor.status = newStatus;
          }
        }
      })
      .addCase(updateDonorStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedView } = donorSlice.actions;
export default donorSlice.reducer;