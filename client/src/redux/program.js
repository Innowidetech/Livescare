import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://livescare.onrender.com/api/admin';

export const fetchPrograms = createAsyncThunk(
  'program/fetchPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/program`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }

      const data = await response.json();
      return data.programs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProgram = createAsyncThunk(
  'program/addProgram',
  async (programData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('title', programData.title);
      formData.append('date', programData.date);
      formData.append('time', programData.time);
      formData.append('location', programData.location);
      formData.append('description', programData.description);
      
      // Append both images with the same field name 'photo'
      programData.images.forEach((image) => {
        formData.append('photo', image);
      });

      const response = await fetch(`${BASE_URL}/program`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add program');
      }

      const data = await response.json();
      // Fetch updated programs list after successful addition
      await dispatch(fetchPrograms()).unwrap();
      return data.program;
    } catch (error) {
      console.error('Add program error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProgram = createAsyncThunk(
  'program/deleteProgram',
  async (programId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${BASE_URL}/program/${programId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete program');
      }

      // Fetch updated programs list after successful deletion
      await dispatch(fetchPrograms()).unwrap();
      return programId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const programSlice = createSlice({
  name: 'program',
  initialState: {
    programs: [],
    loading: false,
    error: null,
    actionStatus: {
      adding: false,
      deleting: false,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Programs
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
        state.error = null;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Program
      .addCase(addProgram.pending, (state) => {
        state.actionStatus.adding = true;
        state.error = null;
      })
      .addCase(addProgram.fulfilled, (state) => {
        state.actionStatus.adding = false;
        state.error = null;
      })
      .addCase(addProgram.rejected, (state, action) => {
        state.actionStatus.adding = false;
        state.error = action.payload;
      })
      // Delete Program
      .addCase(deleteProgram.pending, (state) => {
        state.actionStatus.deleting = true;
        state.error = null;
      })
      .addCase(deleteProgram.fulfilled, (state) => {
        state.actionStatus.deleting = false;
        state.error = null;
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.actionStatus.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = programSlice.actions;
export default programSlice.reducer;