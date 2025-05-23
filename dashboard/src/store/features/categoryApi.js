import { createApi } from "@reduxjs/toolkit/query/react";
import { categoryEndpoints } from "@mern/apis";

import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: categoryEndpoints,
});

export const { useAddCategoryMutation, useGetCategoriesQuery } = categoryApi;
