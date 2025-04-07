import axios from "axios";
import { applyProcessResInterceptors, BASE_URL } from "./axiosAuthInterceptor";

export const adminApi = axios.create({
  baseURL: `${BASE_URL}/admin`,
  withCredentials: true,
});

applyProcessResInterceptors(adminApi);

export const userApi = axios.create({
  baseURL: BASE_URL,
});

applyProcessResInterceptors(userApi);

export const sellerApi = axios.create({
  baseURL: `${BASE_URL}/seller`,
  withCredentials: true,
});

applyProcessResInterceptors(sellerApi);

export const getAxiosInstance = ({ isAdmin = false, isSeller = false }) => {
  if (isAdmin) return adminApi;
  if (isSeller) return sellerApi;
  return userApi;
};
