import { adminApi, sellerApi } from "./apiInstance";

const axiosBaseQuery =
  () =>
  async (
    { url, method, data, params, isAdmin = false, isSeller = false },
    { getState }
  ) => {
    try {
      const state = getState();
      const accessToken = state.auth?.accessToken;

      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};
      if (data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
      } else {
        headers["Content-Type"] = "application/json";
      }

      let axiosInstance = null;

      if (isAdmin) {
        axiosInstance = adminApi;
      } else if (isSeller) {
        axiosInstance = sellerApi;
      }

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

export default axiosBaseQuery;
