import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://livescare.onrender.com/api/admin/item';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk(
  'inventory/fetchItems',
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
          errorData?.message || `Failed to fetch items (${response.status})`
        );
      }
      
      const data = await response.json();
      if (!data || !data.inventory) {
        return rejectWithValue('Invalid response format from server');
      }
      
      return data.inventory;
    } catch (error) {
      console.error('Fetch error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const addItem = createAsyncThunk(
  'inventory/addItem',
  async (itemData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Check if item already exists
      const state = getState();
      const existingItem = state.inventory.items.find(
        item => item.itemName === itemData.name
      );

      if (existingItem) {
        // If item exists, calculate new quantity
        const newQuantity = itemData.name === 'Money'
          ? (Number(existingItem.amount) + Number(itemData.amount)).toString()
          : (Number(existingItem.count) + Number(itemData.count)).toString();

        // Update existing item with combined quantity
        const apiData = {
          newStatus: itemData.status,
          ...(itemData.name === 'Money'
            ? { newAmount: newQuantity }
            : { newCount: newQuantity }
          )
        };

        const response = await fetch(`${API_URL}/${existingItem._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(apiData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          return rejectWithValue(
            errorData?.message || `Failed to update item (${response.status})`
          );
        }

        const data = await response.json();
        if (!data) {
          return rejectWithValue('Invalid response format from server');
        }

        return {
          ...data,
          _id: existingItem._id,
          itemName: itemData.name,
          status: itemData.status,
          ...(itemData.name === 'Money'
            ? { amount: newQuantity }
            : { count: newQuantity }
          )
        };
      } else {
        // If item doesn't exist, create new
        const apiData = {
          itemName: itemData.name,
          status: itemData.status,
          ...(itemData.name === 'Money' 
            ? { amount: itemData.amount.toString() }
            : { count: itemData.count.toString() }
          )
        };

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(apiData),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          return rejectWithValue(
            errorData?.message || `Failed to add item (${response.status})`
          );
        }
        
        const data = await response.json();
        if (!data) {
          return rejectWithValue('Invalid response format from server');
        }
        
        return data;
      }
    } catch (error) {
      console.error('Add item error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const updateItem = createAsyncThunk(
  'inventory/updateItem',
  async ({ itemId, itemData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Format the payload according to the API requirements
      const apiData = {
        newStatus: itemData.status,
        ...(itemData.name === 'Money' 
          ? { newAmount: itemData.amount.toString() }
          : { newCount: itemData.count.toString() }
        )
      };

      const response = await fetch(`${API_URL}/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to update item (${response.status})`
        );
      }

      const data = await response.json();
      if (!data) {
        return rejectWithValue('Invalid response format from server');
      }

      // Return the complete updated item data
      return {
        ...data,
        _id: itemId,
        itemName: itemData.name,
        status: itemData.status,
        ...(itemData.name === 'Money' 
          ? { amount: apiData.newAmount }
          : { count: apiData.newCount }
        )
      };
    } catch (error) {
      console.error('Update item error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

export const deleteItem = createAsyncThunk(
  'inventory/deleteItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        return rejectWithValue(
          errorData?.message || `Failed to delete item (${response.status})`
        );
      }

      return itemId;
    } catch (error) {
      console.error('Delete item error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        const existingItemIndex = state.items.findIndex(
          item => item._id === action.payload._id
        );
        
        if (existingItemIndex !== -1) {
          // Update existing item
          state.items[existingItemIndex] = action.payload;
        } else {
          // Add new item
          state.items.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = inventorySlice.actions;
export default inventorySlice.reducer;