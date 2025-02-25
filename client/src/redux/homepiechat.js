import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDonationData = createAsyncThunk(
  'donations/fetchDonationData',
  async () => {
    try {
      const response = await fetch('https://livescare.onrender.com/api/user/spent');
      if (!response.ok) {
        throw new Error('Failed to fetch donation data');
      }
      const data = await response.json();
      
      // Transform the data into the format we need
      if (data?.data?.submitRequest?.itemPercentages) {
        const percentages = data.data.submitRequest.itemPercentages;
        return Object.entries(percentages)
          .map(([category, percentage]) => ({
            category,
            percentage: parseFloat(percentage)
          }))
          .filter(item => item.percentage > 0); // Only include items with non-zero percentages
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  donationData: [],
  loading: false,
  error: null,
};

const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonationData.fulfilled, (state, action) => {
        state.loading = false;
        state.donationData = action.payload;
      })
      .addCase(fetchDonationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.donationData = [];
      });
  },
});

export default donationSlice.reducer;