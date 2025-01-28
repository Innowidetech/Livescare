import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching states
export const fetchStates = createAsyncThunk(
  'location/fetchStates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://www.indiaapi.in/api/v1/states');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch states');
    }
  }
);

// Async thunk for fetching cities
export const fetchCities = createAsyncThunk(
  'location/fetchCities',
  async (stateCode, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://www.indiaapi.in/api/v1/cities/${stateCode}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch cities');
    }
  }
);

const initialState = {
  states: [],
  cities: [],
  loadingStates: false,
  loadingCities: false,
  error: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    clearCities: (state) => {
      state.cities = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // States loading cases
      .addCase(fetchStates.pending, (state) => {
        state.loadingStates = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loadingStates = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loadingStates = false;
        state.error = action.payload;
      })
      // Cities loading cases
      .addCase(fetchCities.pending, (state) => {
        state.loadingCities = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loadingCities = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loadingCities = false;
        state.error = action.payload;
      });
  }
});

export const { clearCities } = locationSlice.actions;
export default locationSlice.reducer;