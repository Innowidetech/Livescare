import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stats: {
    itemCount: 0,
    submitRequestsCount: 0,
    donorRequestsCount: 0,
    dispatchedCount: 0
  },
  percentages: {
    donorRequest: {
      totalCompleted: 0,
      itemPercentages: {
        Food: "0.00",
        Clothes: "0.00",
        Books: "0.00",
        Medical: "0.00",
        Toys: "0.00",
        "Games Kit": "0.00",
        Money: "0.00",
        Others: "0.00"
      }
    },
    submitRequest: {
      totalCompleted: 0,
      itemPercentages: {
        Food: "0.00",
        Clothes: "0.00",
        Books: "0.00",
        Medical: "0.00",
        Toys: "0.00",
        "Games Kit": "0.00",
        Money: "0.00",
        Others: "0.00"
      }
    }
  },
  dailyUsers: {
    currentPeriod: {},
    previousPeriod: {},
    timePeriod: 'week',
    selectedDate: new Date(),
    loading: false,
    error: null
  },
  loading: false,
  error: null
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://livescare.onrender.com/api/admin/getCounts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.counts;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDashboardPercentages = createAsyncThunk(
  'dashboard/fetchPercentages',
  async ({ year, month }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://livescare.onrender.com/api/member/dashboardPercentages/${year}/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDailyUsers = createAsyncThunk(
  'dashboard/fetchDailyUsers',
  async ({ timePeriod }) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = `https://livescare.onrender.com/api/member/dailyUsers/${timePeriod}`;
      
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const requestCounts = response.data.data.requestCounts;
      const previousPeriod = {};

      if (timePeriod === 'week') {
        // For weeks, create previous period with same weeks but 0 values
        Object.keys(requestCounts).forEach(key => {
          previousPeriod[key] = 0;
        });
      } else if (timePeriod === 'month') {
        // For months, maintain order: Jan to Dec
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        months.forEach(month => {
          previousPeriod[month] = 0;
        });
      } else if (timePeriod === 'year') {
        // For years, use previous year with 0 value
        const currentYear = new Date().getFullYear();
        previousPeriod[currentYear - 1] = 0;
      }

      return {
        currentPeriod: requestCounts,
        previousPeriod: previousPeriod
      };
    } catch (error) {
      throw error;
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setTimePeriod: (state, action) => {
      state.dailyUsers.timePeriod = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.dailyUsers.selectedDate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      })
      // Dashboard Percentages
      .addCase(fetchDashboardPercentages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardPercentages.fulfilled, (state, action) => {
        state.loading = false;
        state.percentages = action.payload;
      })
      .addCase(fetchDashboardPercentages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch percentages';
      })
      // Daily Users
      .addCase(fetchDailyUsers.pending, (state) => {
        state.dailyUsers.loading = true;
        state.dailyUsers.error = null;
      })
      .addCase(fetchDailyUsers.fulfilled, (state, action) => {
        state.dailyUsers.loading = false;
        state.dailyUsers.currentPeriod = action.payload.currentPeriod;
        state.dailyUsers.previousPeriod = action.payload.previousPeriod;
        state.dailyUsers.error = null;
      })
      .addCase(fetchDailyUsers.rejected, (state, action) => {
        state.dailyUsers.loading = false;
        state.dailyUsers.error = action.error.message || 'Failed to fetch daily users';
      });
  },
});

export const { setTimePeriod, setSelectedDate } = dashboardSlice.actions;
export default dashboardSlice.reducer;