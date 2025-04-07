import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ page = 1, limit = 5, search = "" }) => ({
        url: "/categories",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        data,
        isAdmin: true,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categoryApi;
