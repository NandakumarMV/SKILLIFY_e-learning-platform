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
    editVideo: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/edit-video`,
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
    getTutorIndividualRoom: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/get-or-create-tutor-room`,
        method: "POST",
        body: data,
      }),
    }),
    getTutorRooms: builder.mutation({
      query: (tutorId) => ({
        url: `${TUTOR_URL}/get-tutor-rooms/${tutorId}`,
        method: "GET",
      }),
    }),
    getTutorMessages: builder.mutation({
      query: (roomId) => ({
        url: `${TUTOR_URL}/get-room-messages/${roomId}`,
        method: "GET",
      }),
    }),
    sendTutorMessage: builder.mutation({
      query: (data) => ({
        url: `${TUTOR_URL}/send-message`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${TUTOR_URL}/get-users/`,
        method: "GET",
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
  useAddVideoMutation,
  useDeleteCourseMutation,
  useEditVideoMutation,
  useGetTutorIndividualRoomMutation,
  useGetTutorMessagesMutation,
  useSendTutorMessageMutation,
  useGetTutorRoomsMutation,
  useGetAllUsersMutation,
} = tutorApiSlice;
