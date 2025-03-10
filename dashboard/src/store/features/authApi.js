import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from '../../api/axiosBaseQuery'

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        data,
        isAdmin: true,
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = authApi;
