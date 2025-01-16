// availabilitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  availableTables: [],
};

const availabilitySlice = createSlice({
  name: 'availability',
  initialState,
  reducers: {
    setAvailableTables: (state, action) => {
      state.availableTables = action.payload;
    },
    clearAvailableTables: (state) => {
      state.availableTables = [];
    },
  },
});

export const { setAvailableTables, clearAvailableTables } = availabilitySlice.actions;
export default availabilitySlice.reducer;
