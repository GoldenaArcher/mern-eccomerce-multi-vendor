import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";
import { featuredProductEndpoints } from "@mern/apis";

export const featuredProductApi = createApi({
  reducerPath: "featuredProductApi",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: featuredProductEndpoints,
});

export const { useGetPartitionedFeaturedProductsQuery } = featuredProductApi;
