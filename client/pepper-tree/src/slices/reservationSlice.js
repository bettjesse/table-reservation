// import { createSlice } from "@reduxjs/toolkit";
// import dayjs from "dayjs";

// Initial state
// const initialState = {
//   reservationData: null,
// };

// const reservationSlice = createSlice({
//   name: "reservation",
//   initialState,
//   reducers: {
//     // Set formatted reservation data
//     setReservationData: (state, action) => {
//       const { date, time, partySize } = action.payload;
    
//       // Update only the provided fields, keeping the rest unchanged
//       state.reservationData = {
//         ...state.reservationData,
//         date: date ? dayjs(date).format("YYYY-MM-DD") : state.reservationData?.date,
//         time: time ? dayjs(time).format("HH:mm") : state.reservationData?.time,
//         partySize: partySize !== undefined ? parseInt(partySize, 10) : state.reservationData?.partySize,
//       };
//     },
    
//     clearReservationData: (state) => {
//       state.reservationData = null;
//     },
//   },
// });

// export const { setReservationData, clearReservationData } = reservationSlice.actions;
// export default reservationSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  reservationData: {
    date: null,
    time: null,
    partySize: null,
    tableId: null, // Added tableId to store the selected table's ID
  },
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    // Set reservation data including tableId
    setReservationData: (state, action) => {
      const { date, time, partySize, tableId } = action.payload;

      state.reservationData = {
        ...state.reservationData,
        date: date || state.reservationData?.date,
        time: time || state.reservationData?.time,
        partySize: partySize !== undefined ? parseInt(partySize, 10) : state.reservationData?.partySize,
        tableId: tableId || state.reservationData?.tableId, // Update tableId if provided
      };
    },

    // Clear all reservation data
    clearReservationData: (state) => {
      state.reservationData = {
        date: null,
        time: null,
        partySize: null,
        tableId: null, // Reset tableId along with other fields
      };
    },
  },
});

export const { setReservationData, clearReservationData } = reservationSlice.actions;
export default reservationSlice.reducer;
