import axios from "axios";
import { applyProcessResInterceptors, BASE_URL } from "./axiosAuthInterceptor";

export const userApi = axios.create({
  baseURL: BASE_URL,
});

applyProcessResInterceptors(userApi);

export const getAxiosInstance = () => {
  return userApi;
};
