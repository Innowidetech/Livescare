import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://livescare.onrender.com/api/member/submit';

const initialState = {
  requests: [],
  status: 'idle', 
  error: null,
  selectedView: {
    location: 'city',
    contact: 'mobileNumber',
  }
};

export const fetchMemberSubmitRequests = createAsyncThunk(
  'memberSubmit/fetchSubmitRequests',
  async ({ location, contact }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/${location}/${contact}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to fetch submit requests (${response.status})`
        );
      }
      
      const data = await response.json();
      
      if (!data) {
        return rejectWithValue('Invalid response format from server');
      }
      
      return data;
    } catch (error) {
      console.error('Fetch submit requests error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const updateMemberRequestStatus = createAsyncThunk(
  'memberSubmit/updateRequestStatus',
  async ({ requestId, newStatus }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`https://livescare.onrender.com/api/member/updateSubmitRequestStatus/${requestId}/${newStatus}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to update status (${response.status})`
        );
      }

      const data = await response.json();
      return { requestId, newStatus };
    } catch (error) {
      console.error('Update status error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const memberSubmitSlice = createSlice({
  name: 'memberSubmit',
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
      .addCase(fetchMemberSubmitRequests.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMemberSubmitRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(fetchMemberSubmitRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.requests = [];
      })
      .addCase(updateMemberRequestStatus.pending, (state) => {
        state.error = null;
      })
      .addCase(updateMemberRequestStatus.fulfilled, (state, action) => {
        const { requestId, newStatus } = action.payload;
        if (state.requests?.submits) {
          const request = state.requests.submits.find(r => r.id === requestId);
          if (request) {
            request.status = newStatus;
          }
        }
      })
      .addCase(updateMemberRequestStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, setSelectedView } = memberSubmitSlice.actions;
export default memberSubmitSlice.reducer;