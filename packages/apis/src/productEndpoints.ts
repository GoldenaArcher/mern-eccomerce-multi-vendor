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
    query: ({ page = 1, limit = 5, search = "", all = false }) => {
      if (all) {
        return {
          url: "/products",
          method: "GET",
          params: { all: true },
        };
      }

      return {
        url: "/products",
        method: "GET",
        params: { page, limit, search },
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
