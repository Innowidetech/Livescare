import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching all programs
export const fetchPrograms = createAsyncThunk(
  'programs/fetchPrograms',
  async () => {
    try {
      const response = await fetch('https://livescare.onrender.com/api/user/programs');
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();
      return data.programs || []; // Extract programs array from response
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Async thunk for fetching a single program
export const fetchProgramById = createAsyncThunk(
  'programs/fetchProgramById',
  async (programId) => {
    try {
      const response = await fetch(`https://livescare.onrender.com/api/user/program/${programId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch program');
      }
      const data = await response.json();
      return data.program || data; // Handle both response formats
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    programs: [],
    currentProgram: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProgram: (state) => {
      state.currentProgram = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPrograms
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
        state.programs = [];
        state.error = action.error.message;
      })
      // Handle fetchProgramById
      .addCase(fetchProgramById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgramById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProgram = action.payload;
        state.error = null;
      })
      .addCase(fetchProgramById.rejected, (state, action) => {
        state.loading = false;
        state.currentProgram = null;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProgram } = programsSlice.actions;
export default programsSlice.reducer;