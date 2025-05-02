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
    query: (shopId: string) => ({
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
});
