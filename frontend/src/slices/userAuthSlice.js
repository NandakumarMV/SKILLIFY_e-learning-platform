import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  users: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    addToUsers: (state, action) => {
      state.users = action.payload;
    },
    setBlocked: (state, action) => {
      const userId = action.payload;

      state.users = state.users.map((user) =>
        user._id === userId ? { ...user, isBlocked: true } : user
      );
    },
    setUnBlocked: (state, action) => {
      const userId = action.payload;
      state.users = state.users.map((user) =>
        user._id === userId ? { ...user, isBlocked: false } : user
      );
    },
  },
});

export const { setCredentials, logout, setBlocked, setUnBlocked, addToUsers } =
  authSlice.actions;
export default authSlice.reducer;
