import _ from "lodash";

export type PriceRange = {
  minPrice?: number;
  maxPrice?: number;
};

export type ProductQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  priceRange?: PriceRange;
  sortBy?: string;
  rating?: number;
  all?: boolean;
};

const buildProductParams = ({
  page = 1,
  limit = 12,
  search = "",
  categories = [],
  priceRange = {},
  sortBy = "",
  rating = 0,
  all = false,
}: ProductQueryParams): Record<string, any> => {
  if (all) return { all: true, sortBy };

  const params: Record<string, any> = { page, limit, search };

  if (categories.length > 0) {
    params.categories = categories.join(",");
  }

  if (_.isNumber(priceRange.minPrice)) {
    params.priceLow = priceRange.minPrice;
  }

  if (_.isNumber(priceRange.maxPrice)) {
    params.priceHigh = priceRange.maxPrice;
  }

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (rating > 0) {
    params.rating = rating;
  }

  return params;
};

export const shopEndpoints = (builder: any) => ({
  getShops: builder.query({
    query: ({ page = 0, limit = 5, search = "", all = false } = {}) => {
      if (all) {
        return {
          url: "/shops",
          method: "GET",
          params: { all: true, search },
        };
      }
      return {
        url: "/shops",
        method: "GET",
        params: { page, limit, search },
      };
    },
    providesTags: ["Shop"],
  }),
  getShopForCurrentSeller: builder.query({
    query: () => ({
      url: "/shop",
      method: "GET",
      isSeller: true,
    }),
    providesTags: ["Shop"],
  }),
  addShop: builder.mutation({
    query: (shopData: any) => ({
      url: "/shop",
      method: "POST",
      data: shopData,
      isSeller: true,
    }),
    invalidatesTags: ["Shop"],
  }),
  updateShop: builder.mutation({
    query: (shopData: any) => ({
      url: "/shop",
      method: "PUT",
      data: shopData,
      isSeller: true,
    }),
    invalidatesTags: ["Shop"],
  }),
  getShopCategories: builder.query({
    query: (shopId = "") => ({
      url: `/shops/${shopId}/categories`,
      method: "GET",
    }),
    providesTags: (result: unknown, error: unknown, shopId: string) => [
      { type: "ShopCategories", id: shopId },
    ],
  }),
  getShopPriceRange: builder.query({
    query: (shopId: string) => ({
      url: `/shops/${shopId}/price-range`,
      method: "GET",
    }),
    providesTags: (result: unknown, error: unknown, shopId: string) => [
      { type: "ShopPriceRange", id: shopId },
    ],
  }),
  getShopProducts: builder.query({
    query: ({
      shopId = "",
      ...options
    }: ProductQueryParams & { shopId?: string }) => ({
      url: `/shops/${shopId}/products`,
      method: "GET",
      params: buildProductParams(options),
    }),
    providesTags: (result: unknown, error: unknown, shopId: string) => [
      { type: "ShopProducts", id: shopId },
    ],
  }),
});
