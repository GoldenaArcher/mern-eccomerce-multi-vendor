export const shopEndpoints = (builder: any) => ({
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
