export const categoryEndpoints = (builder: any) => ({
  getCategories: builder.query({
    query: ({ page = 0, limit = 5, search = "", all = false } = {}) => {
      if (all) {
        return {
          url: "/categories",
          method: "GET",
          params: { all: true, search },
        };
      }
      return {
        url: "/categories",
        method: "GET",
        params: { page, limit, search },
      };
    },
    providesTags: ["Category"],
  }),
  getCategoryPriceRange: builder.query({
    query: (categoryId: string) => ({
      url: `/categories/${categoryId}/price-range`,
      method: "GET",
    }),
    providesTags: (result: unknown, error: unknown, categoryId: string) => [
      { type: "CategoryPriceRange", id: categoryId },
    ],
  }),
  addCategory: builder.mutation({
    query: (data: any) => ({
      url: "/categories",
      method: "POST",
      data,
      isAdmin: true,
    }),
    invalidatesTags: ["Category"],
  }),
});
