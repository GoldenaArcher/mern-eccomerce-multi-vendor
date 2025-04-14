import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQueryWithReauth from "../../api/axiosBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    updateSellerAvatar: builder.mutation({
      query: (data) => ({
        url: "/user/avatar",
        method: "PATCH",
        data,
        isSeller: true,
      }),
    }),
  }),
});

export const { useUpdateSellerAvatarMutation } = userApi;
