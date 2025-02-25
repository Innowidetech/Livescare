import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://livescare.onrender.com/api/admin/members';
const REGISTRATION_URL = 'https://livescare.onrender.com/api/admin/registration';

const initialState = {
  members: [],
  status: 'idle',
  error: null,
  registrationStatus: null,
  registrationError: null,
};

export const fetchMembers = createAsyncThunk(
  'member/fetchMembers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to fetch members (${response.status})`
        );
      }
      
      const data = await response.json();
      
      if (!data) {
        return rejectWithValue('Invalid response format from server');
      }
      
      return data;
    } catch (error) {
      console.error('Fetch members error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const registerMember = createAsyncThunk(
  'member/registerMember',
  async (memberData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(REGISTRATION_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to register member (${response.status})`
        );
      }

      return { status: response.status, data: await response.json() };
    } catch (error) {
      console.error('Register member error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.registrationError = null;
    },
    resetRegistrationStatus: (state) => {
      state.registrationStatus = null;
      state.registrationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Members Cases
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = action.payload;
        state.error = null;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.members = [];
      })
      // Register Member Cases
      .addCase(registerMember.pending, (state) => {
        state.registrationStatus = null;
        state.registrationError = null;
      })
      .addCase(registerMember.fulfilled, (state, action) => {
        state.registrationStatus = action.payload;
        state.registrationError = null;
      })
      .addCase(registerMember.rejected, (state, action) => {
        state.registrationStatus = null;
        state.registrationError = action.payload;
      });
  },
});

export const { clearError, resetRegistrationStatus } = memberSlice.actions;
export default memberSlice.reducer;