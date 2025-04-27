import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";
import { categoryEndpoints } from "@mern/apis";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: categoryEndpoints,
});

export const { useGetCategoriesQuery } = categoryApi;
