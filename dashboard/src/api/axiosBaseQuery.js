import { adminApi } from "./apiInstance";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, isAdmin = false }, { getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      if (data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
      } else {
        headers["Content-Type"] = "application/json";
      }

      const axiosInstance = isAdmin ? adminApi : adminApi;

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
