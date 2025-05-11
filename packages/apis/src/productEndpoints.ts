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
    query: (options: ProductQueryParams) => ({
      url: "/products",
      method: "GET",
      params: buildProductParams(options),
    }),
    providesTags: ["Product"],
  }),
  getProductsByShopId: builder.query({
    query: ({
      shopId = "",
      ...options
    }: ProductQueryParams & { shopId?: string }) => ({
      url: `/products/shop/${shopId}`,
      method: "GET",
      params: buildProductParams(options),
    }),
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
