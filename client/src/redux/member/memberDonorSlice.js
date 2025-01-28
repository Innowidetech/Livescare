import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://livescare.onrender.com/api/member/donor';

const initialState = {
  donors: [],
  status: 'idle',
  error: null,
  selectedView: {
    place: 'city',
    contact: 'mobileNumber'
  }
};

export const fetchMemberDonors = createAsyncThunk(
  'memberDonor/fetchMemberDonors',
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

export const updateMemberDonorStatus = createAsyncThunk(
  'memberDonor/updateMemberDonorStatus',
  async ({ donorId, newStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`https://livescare.onrender.com/api/member/updateDonorRequestStatus/${donorId}/${newStatus}`, {
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

const memberDonorSlice = createSlice({
  name: 'memberDonor',
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
      .addCase(fetchMemberDonors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMemberDonors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donors = action.payload;
        state.error = null;
      })
      .addCase(fetchMemberDonors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.donors = [];
      })
      .addCase(updateMemberDonorStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateMemberDonorStatus.fulfilled, (state, action) => {
        const { donorId, newStatus } = action.payload;
        if (state.donors?.donors) {
          const donor = state.donors.donors.find(d => d.id === donorId);
          if (donor) {
            donor.status = newStatus;
          }
        }
      })
      .addCase(updateMemberDonorStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedView } = memberDonorSlice.actions;
export default memberDonorSlice.reducer;