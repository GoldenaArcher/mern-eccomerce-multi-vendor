import { isAxiosError } from "axios";
import { getAuthToken, storeAuthToken } from "../utils/authHandler";
import { getAxiosInstance } from "./apiInstance";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, isAdmin = false, isSeller = false }) => {
    try {
      const axiosInstance = getAxiosInstance({ isAdmin, isSeller });

      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type":
            data instanceof FormData
              ? "multipart/form-data"
              : "application/json",
        },
      });

      return { data: result };
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          error: {
            status: error.response?.status || 500,
            data: error.response?.data || error.message,
          },
        };
      }

      return {
        error: {
          status: 500,
          data: "Unknown error",
        },
      };
    }
  };

const rawBaseQuery = axiosBaseQuery();

const axiosBaseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  const isExpired =
    result.error?.status === 401 &&
    typeof result.error.data?.message === "string" &&
    result.error.data.message.includes("expired");

  const { isAdmin = false, isSeller = false } = args;
  const axiosInstance = getAxiosInstance({ isAdmin, isSeller });

  if (isExpired) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await axiosInstance.post("/refresh-token");

        if (refreshResult) {
          storeAuthToken(refreshResult.accessToken);
          api.dispatch({
            type: "auth/updateToken",
            payload: refreshResult.accessToken,
          });

          await new Promise((resolve) => setTimeout(resolve, 10));
        } else {
          // api.dispatch({ type: "auth/logout" });
          return result;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
    }

    result = await rawBaseQuery(args, api, extraOptions);
  }

  return result;
};

export default axiosBaseQueryWithReauth;
