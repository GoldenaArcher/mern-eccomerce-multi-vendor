import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getProducts: builder.query({
      query: ({ page = 1, limit = 5, search = "", all = false }) => {
        if (all) {
          return {
            url: "/products",
            method: "GET",
            params: { all: true },
          };
        }

        return {
          url: "/products",
          method: "GET",
          params: { page, limit, search },
        };
      },
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        data,
        isSeller: true,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        data,
        isSeller: true,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = productApi;
