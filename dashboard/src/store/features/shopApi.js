import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    getShopForCurrentSeller: builder.query({
      query: () => ({
        url: "/shop",
        method: "GET",
        isSeller: true,
      }),
      providesTags: ["Shop"],
    }),
    addShop: builder.mutation({
      query: (shopData) => ({
        url: "/shop",
        method: "POST",
        data: shopData,
        isSeller: true,
      }),
      invalidatesTags: ["Shop"],
    }),
    updateShop: builder.mutation({
      query: (shopData) => ({
        url: "/shop",
        method: "PUT",
        data: shopData,
        isSeller: true,
      }),
      invalidatesTags: ["Shop"],
    }),
  }),
});

export const {
  useGetShopForCurrentSellerQuery,
  useAddShopMutation,
  useUpdateShopMutation,
} = shopApi;
