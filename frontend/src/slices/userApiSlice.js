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
    addWishlist: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-wishlist`,
        method: "POST",
        body: data,
      }),
    }),
    getWishlist: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-wishlist`,
        method: "get",
      }),
    }),
    getAllWishlist: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-all-wishlist`,
        method: "get",
      }),
    }),
    deleteFromWishlist: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete-wishlist`,
        method: "delete",
        body: data,
      }),
    }),
    generateOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "Post",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-otp`,
        method: "Post",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: "Post",
        body: data,
      }),
    }),
    getSuggestion: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-suggestions`,
        method: "get",
      }),
    }),
    getTutorDetails: builder.mutation({
      query: (tutorId) => ({
        url: `${USERS_URL}/get-tutor-details/${tutorId}`,
        method: "get",
      }),
    }),
    getIndividualRoom: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/get-or-createroom`,
        method: "POST",
        body: data,
      }),
    }),
    getRooms: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/getrooms/${userId}`,
        method: "GET",
      }),
    }),
    getMessages: builder.mutation({
      query: (roomId) => ({
        url: `${USERS_URL}/get-room-messages/${roomId}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/send-message`,
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
  useAddWishlistMutation,
  useGetWishlistMutation,
  useGetAllWishlistMutation,
  useDeleteFromWishlistMutation,
  useGenerateOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGetSuggestionMutation,
  useGetTutorDetailsMutation,
  useGetIndividualRoomMutation,
  useGetRoomsMutation,
  useGetMessagesMutation,
  useSendMessageMutation,
} = userApiSlice;
