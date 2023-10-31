import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/userAuthSlice";
import { apiSlice } from "./slices/apiSlice";
import adminAuthSlice from "./slices/adminAuthSlice";
import tutorAuthSlice from "./slices/tutorAuthSlice";
import domainSlice from "./slices/domainSlice";
import courseDetailsSlice from "./slices/courseDetailsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthSlice,
    tutorAuth: tutorAuthSlice,
    domains: domainSlice,
    courses: courseDetailsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
