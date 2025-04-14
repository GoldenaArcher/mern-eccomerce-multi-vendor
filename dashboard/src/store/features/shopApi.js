import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    getShopForCurrentSeller: builder.query({
      query: () => ({
        url: "/shop",
        method: "GET",
        isSeller: true,
      }),
    }),
  }),
});

export const { useGetShopForCurrentSellerQuery } = shopApi;
