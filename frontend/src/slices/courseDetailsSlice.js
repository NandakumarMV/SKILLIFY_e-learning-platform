// courseSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  allCourses: [],
  videos: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setAllCourses: (state, action) => {
      state.allCourses = action.payload;
    },
    addVideoToCourse: (state, action) => {
      state.videos.push(action.payload.video);
    },
    removeVideoFromCourse: (state, action) => {
      const courseId = action.payload.courseId;
      const videoId = action.payload.videoId;

      const course = state.allCourses.find((course) => course._id === courseId);

      if (course) {
        const newVideos = course.videos.filter(
          (video) => video.videoUniqueId !== videoId
        );
        const updatedCourse = {
          ...course,
          videos: newVideos,
        };
        const courseIndex = state.allCourses.findIndex(
          (c) => c._id === courseId
        );

        state.allCourses[courseIndex] = updatedCourse;
      }
    },
    setApproveCourse: (state, action) => {
      const courseId = action.payload.courseId;
      const course = state.allCourses.find((course) => course._id === courseId);
      if (course) {
        (course.approved = true), (course.rejected = false);
      }
    },
    setRejectCourse: (state, action) => {
      const courseId = action.payload.courseId;
      const course = state.allCourses.find((course) => course._id === courseId);
      if (course) {
        (course.approved = false), (course.rejected = true);
      }
    },
  },
});

export const {
  setCourses,
  addVideoToCourse,
  removeVideoFromCourse,
  setAllCourses,
  setApproveCourse,
  setRejectCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;
