import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
  domains: [],
};

const AdminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    setDomain: (state, action) => {
      state.domains = action.payload;
    },

    adminLogout: (state, action) => {
      (state.adminInfo = null), localStorage.removeItem("adminInfo");
    },
  },
});

export const { setAdminCredentials, adminLogout, setDomain, deleteDomain } =
  AdminAuthSlice.actions;
export default AdminAuthSlice.reducer;
