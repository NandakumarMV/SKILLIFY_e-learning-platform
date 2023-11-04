import { apiSlice } from "./apiSlice";
const TUTOR_URL = "/api/tutor";

export const tutorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tutorLogin: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/login`,
        method: "post",
        body: data,
      }),
    }),
    tutorRegister: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/register`,
        method: "post",
        body: data,
      }),
    }),
    tutorlogout: builder.mutation({
      query: () => ({
        url: `${TUTOR_URL}/logout`,
        method: "post",
      }),
    }),
    updateTutorProfile: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/profile`,
        method: "put",
        body: data,
      }),
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/add-course`,
        method: "post",
        body: data,
      }),
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/add-video`,
        method: "post",
        body: data,
      }),
    }),
    deleteCourseVideo: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/delete-video`,
        method: "delete",
        body: data,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/delete-course`,
        method: "delete",
        body: data,
      }),
    }),
  }),
});

export const {
  useTutorLoginMutation,
  useTutorRegisterMutation,
  useTutorlogoutMutation,
  useUpdateTutorProfileMutation,
  useAddCourseMutation,
  useDeleteCourseVideoMutation,
  useAddVideoMutation,useDeleteCourseMutation
} = tutorApiSlice;
