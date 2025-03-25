import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../../api/axiosBaseQuery";

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
    sellerRegister: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        data,
        isSeller: true,
      }),
    }),
    sellerLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        data,
        isSeller: true,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useSellerRegisterMutation,
  useSellerLoginMutation,
} = authApi;
