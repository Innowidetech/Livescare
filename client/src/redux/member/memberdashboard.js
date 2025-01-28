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

export const fetchMemberDashboardStats = createAsyncThunk(
  'memberDashboard/fetchStats',
  async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://livescare.onrender.com/api/member/getCounts', {
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

export const fetchMemberDashboardPercentages = createAsyncThunk(
  'memberDashboard/fetchPercentages',
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

export const fetchMemberDailyUsers = createAsyncThunk(
  'memberDashboard/fetchDailyUsers',
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
        Object.keys(requestCounts).forEach(key => {
          previousPeriod[key] = 0;
        });
      } else if (timePeriod === 'month') {
        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        months.forEach(month => {
          previousPeriod[month] = 0;
        });
      } else if (timePeriod === 'year') {
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

const memberDashboardSlice = createSlice({
  name: 'memberDashboard',
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
      // Member Dashboard Stats
      .addCase(fetchMemberDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchMemberDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch member dashboard stats';
      })
      // Member Dashboard Percentages
      .addCase(fetchMemberDashboardPercentages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberDashboardPercentages.fulfilled, (state, action) => {
        state.loading = false;
        state.percentages = action.payload;
      })
      .addCase(fetchMemberDashboardPercentages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch member percentages';
      })
      // Member Daily Users
      .addCase(fetchMemberDailyUsers.pending, (state) => {
        state.dailyUsers.loading = true;
        state.dailyUsers.error = null;
      })
      .addCase(fetchMemberDailyUsers.fulfilled, (state, action) => {
        state.dailyUsers.loading = false;
        state.dailyUsers.currentPeriod = action.payload.currentPeriod;
        state.dailyUsers.previousPeriod = action.payload.previousPeriod;
        state.dailyUsers.error = null;
      })
      .addCase(fetchMemberDailyUsers.rejected, (state, action) => {
        state.dailyUsers.loading = false;
        state.dailyUsers.error = action.error.message || 'Failed to fetch member daily users';
      });
  },
});

export const { setTimePeriod, setSelectedDate } = memberDashboardSlice.actions;
export default memberDashboardSlice.reducer;