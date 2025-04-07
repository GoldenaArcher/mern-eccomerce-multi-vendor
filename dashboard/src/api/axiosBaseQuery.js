import { isAxiosError } from "axios";
import { getAuthToken, storeAuthToken } from "../utils/authHandler";
import { getAxiosInstance } from "./apiInstance";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const axiosBaseQuery = async ({
  url,
  method,
  data,
  params,
  isAdmin = false,
  isSeller = false,
}) => {
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
          data instanceof FormData ? "multipart/form-data" : "application/json",
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

    console.error(error);

    return {
      error: {
        status: 500,
        data: "Unknown error",
      },
    };
  }
};

const axiosBaseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock(); // Wait here if another refresh is in progress

  let result = await axiosBaseQuery(args, api, extraOptions);

  const isExpired =
    result.error?.status === 401 &&
    typeof result.error.data?.message === "string" &&
    result.error.data.message.includes("expired");

  if (isExpired) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await getAxiosInstance(args).post(
          "/refresh-token"
        );

        const newAccessToken = refreshResult?.data?.accessToken;
        if (newAccessToken) {
          storeAuthToken(newAccessToken);
          api.dispatch({
            type: "auth/updateToken",
            payload: newAccessToken,
          });
        } else {
          return result;
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
    }

    result = await axiosBaseQuery(args, api, extraOptions);
  }

  return result;
};

export default axiosBaseQueryWithReauth;
