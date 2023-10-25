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
    addDomain: (state, action) => {
      state.domains.push(action.payload);
    },
    adminLogout: (state, action) => {
      (state.adminInfo = null), localStorage.removeItem("adminInfo");
    },
  },
});

export const { setAdminCredentials, adminLogout, addDomain } =
  AdminAuthSlice.actions;
export default AdminAuthSlice.reducer;
