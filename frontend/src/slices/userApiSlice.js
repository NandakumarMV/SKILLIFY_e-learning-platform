import { data } from "autoprefixer";
import { apiSlice } from "./apiSlice";

const USERS_URL = "/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "post",
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/google-login`,
        method: "post",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getCourse: builder.mutation({
      query: (courseId) => ({
        url: `${USERS_URL}/single-course/${courseId}`,
        method: "get",
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-payment`,
        method: "POST",
        body: data,
      }),
    }),
    trackVideo: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/track-video`,
        method: "POST",
        body: data,
      }),
    }),
    courseRating: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/course-rating`,
        method: "POST",
        body: data,
      }),
    }),
    courseRevew: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/course-review`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useGoogleLoginMutation,
  useGetCourseMutation,
  useVerifyPaymentMutation,
  useTrackVideoMutation,
  useCourseRatingMutation,
  useCourseRevewMutation,
} = userApiSlice;
