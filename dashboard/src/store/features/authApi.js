import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQueryWithReauth,
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
    getCurrentAdmin: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
        isAdmin: true,
      }),
    }),
    getCurrentSeller: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
        isSeller: true,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useSellerRegisterMutation,
  useSellerLoginMutation,
  useGetCurrentAdminQuery,
  useGetCurrentSellerQuery,
} = authApi;
