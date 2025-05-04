export const productEndpoints = (builder: any) => ({
  getProductById: builder.query({
    query: (id: string) => ({
      url: `/products/${id}`,
      method: "GET",
    }),
    providesTags: (result: any, error: any, id: string) => [
      { type: "Product", id },
    ],
  }),
  getProducts: builder.query({
    query: ({
      page = 1,
      limit = 5,
      search = "",
      category = [],
      all = false,
    } = {}) => {
      if (all) {
        return {
          url: "/products",
          method: "GET",
          params: { all: true },
        };
      }

      const params: Record<string, any> = { page, limit, search };

      if (category.length > 0) {
        params.category = category.join(",");
      }

      return {
        url: "/products",
        method: "GET",
        params,
      };
    },
    providesTags: ["Product"],
  }),
  addProduct: builder.mutation({
    query: (data: any) => ({
      url: "/products",
      method: "POST",
      data,
      isSeller: true,
    }),
    invalidatesTags: ["Product"],
  }),
  updateProduct: builder.mutation({
    query: ({ id, data }: { id: string; data: any }) => ({
      url: `/products/${id}`,
      method: "PUT",
      data,
      isSeller: true,
    }),
    invalidatesTags: ["Product"],
  }),
});
