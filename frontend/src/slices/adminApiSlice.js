import { data } from "autoprefixer";
import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),

    blockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block-user`,
        method: "POST",
        body: data,
      }),
    }),
    unblockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unblock-user`,
        method: "POST",
        body: data,
      }),
    }),
    tutorBlock: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block-tutor`,
        method: "POST",
        body: data,
      }),
    }),
    tutorUnblock: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unblock-tutor`,
        method: "POST",
        body: data,
      }),
    }),
    addDomain: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-domain`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useTutorBlockMutation,
  useTutorUnblockMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useAddDomainMutation,
} = adminApiSlice;
