export const categoryEndpoints = (builder: any) => ({
  getCategories: builder.query({
    query: ({ page = 1, limit = 5, search = "", all = false } = {}) => {
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
