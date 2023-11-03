// courseSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  videos: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addVideoToCourse: (state, action) => {
      console.log(action.payload.video,"action ");
      state.videos.push(action.payload.video);
    },
  },
});

export const { setCourses, addVideoToCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
