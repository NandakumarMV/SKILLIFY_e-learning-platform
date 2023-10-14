import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tutorInfo: localStorage.getItem("tutorInfo")
    ? JSON.parse(localStorage.getItem("tutorInfo"))
    : null,
};

const tutorAuthSlice = createSlice({
  name: "tutorAuth",
  initialState,
  reducers: {
    setTutorCredentials: (state, action) => {
      state.tutorInfo = action.payload;
      localStorage.setItem("tutorInfo", JSON.stringify(action.payload));
    },
    tutorLogout: (state, action) => {
      (state.tutorInfo = null), localStorage.removeItem("tutorInfo");
    },
  },
});

export const { setTutorCredentials, tutorLogout } = tutorAuthSlice.actions;
export default tutorAuthSlice.reducer;
