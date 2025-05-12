import { createApi } from "@reduxjs/toolkit/query/react";
import { shopEndpoints } from "@mern/apis";

import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: axiosBaseQueryWithReauth,
  tagTypes: ["Shop", "ShopCategories", "ShopPriceRange"],
  endpoints: shopEndpoints,
});

export const {
  useGetShopCategoriesQuery,
  useGetShopPriceRangeQuery,
  useLazyGetShopsQuery,
  useGetShopProductsQuery,
} = shopApi;
