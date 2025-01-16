
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reservationReducer from "./slices/reservationSlice";
import tableReducer from "./slices/tableSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    availability: tableReducer,
    reservation: reservationReducer,
    
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
  serializableCheck: false, // Disable serializable check
});

export default store;
