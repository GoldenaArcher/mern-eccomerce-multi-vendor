import { createApi } from "@reduxjs/toolkit/query/react";
import { productEndpoints } from "@mern/apis";

import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: productEndpoints,
});

export const { useGetProductsQuery, useGetProductsByShopIdQuery } = productApi;
