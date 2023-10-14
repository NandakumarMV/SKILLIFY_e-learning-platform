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
      query: (data) => ({
        url: `${TUTOR_URL}/logout`,
        method: "post",
      }),
    }),
  }),
});

export const {
  useTutorLoginMutation,
  useTutorRegisterMutation,
  useTutorlogoutMutation,
} = tutorApiSlice;
