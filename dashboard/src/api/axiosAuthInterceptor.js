import store from "../store";
import { logout } from "../store/features/authSlice";
import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";

const getAuthToken = () =>
  store.getState()?.auth?.accessToken || localStorage.getItem("authToken");

const attachAuthToken = (config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const isTokenExpiredError = (error) => {
  return (
    error.response?.status === 401 &&
    error.response?.data?.message?.toLowerCase().includes("token expired")
  );
};

const handleApiResponse = (res) => {
  const { success, message, data } = res.data || {};

  if (!success) {
    return Promise.reject({ message: message || "An error occurred" });
  }

  return {
    message,
    ...data,
  };
};

const handleAuthError = async (err, axiosInstance) => {
  const originalRequest = err.config;

  if (err.response?.status === 401 && !isTokenExpiredError(err)) {
    return Promise.reject({
      message: err.response?.data?.message || "Invalid credentials",
      status: err.response?.status,
    });
  }

  if (err.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshResponse = await axios.post(`${BASE_URL}/refresh-token`);
      const newToken = refreshResponse.data.token;

      localStorage.setItem("authToken", newToken);
      store.dispatch({ type: "auth/updateToken", payload: newToken });

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshErr) {
      store.dispatch(logout());
      return Promise.reject(refreshErr);
    }
  }

  return Promise.reject({
    message: err.response?.data?.message || "An unexpected error occurred",
    status: err.response?.status,
  });
};

export const applyAuthInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(attachAuthToken, (err) =>
    Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(handleApiResponse, (err) =>
    handleAuthError(err, axiosInstance)
  );

  return axiosInstance;
};
