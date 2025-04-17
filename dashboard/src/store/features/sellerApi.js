import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Seller"],
  endpoints: (builder) => ({
    getSellers: builder.query({
      query: ({ page = 1, limit = 5, search = "", status = "" }) => ({
        url: "/sellers",
        method: "GET",
        isAdmin: true,
        params: { page, limit, search, status },
      }),
    }),
    getSellerById: builder.query({
      query: ({ id, shop = false }) => ({
        url: `/${id}`,
        method: "GET",
        isSeller: true,
        params: { shop },
      }),
      providesTags: ["Seller"],
    }),
    updateSellerStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/sellers/${id}/status`,
        method: "PATCH",
        isAdmin: true,
        data: { status },
      }),
      invalidatesTags: ["Seller"],
    }),
    updateSellerById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        isSeller: true,
        data,
      }),
      invalidatesTags: ["Seller"],
    }),
  }),
});

export const {
  useGetSellersQuery,
  useGetSellerByIdQuery,
  useUpdateSellerByIdMutation,
  useUpdateSellerStatusMutation,
} = sellerApi;
