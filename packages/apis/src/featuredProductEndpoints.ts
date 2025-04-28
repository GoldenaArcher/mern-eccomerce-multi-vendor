export const featuredProductEndpoints = (builder: any) => ({
  getPartitionedFeaturedProducts: builder.query({
    query: ({ types }: { types: string[] }) => ({
      url: "/products/featured/partitioned",
      method: "GET",
      params: {
        types: types.join(","),  
      },
    }),
    providesTags: ["FeaturedProduct"],
  }),
});
