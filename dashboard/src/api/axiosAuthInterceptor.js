export const BASE_URL = "http://localhost:5000/api";

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

export const applyProcessResInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use(handleApiResponse, (err) =>
    Promise.reject(err)
  );

  return axiosInstance;
};
