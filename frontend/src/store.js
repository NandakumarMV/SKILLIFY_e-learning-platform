import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userAuthSlice";
import { apiSlice } from "./slices/apiSlice";
import adminAuthSlice from "./slices/adminAuthSlice";
import tutorAuthSlice from "./slices/tutorAuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthSlice,
    tutorAuth: tutorAuthSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
