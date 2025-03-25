import axios from "axios";
import { applyAuthInterceptors, BASE_URL } from "./axiosAuthInterceptor";

export const adminApi = axios.create({
  baseURL: `${BASE_URL}/admin`,
});

applyAuthInterceptors(adminApi);

export const userApi = axios.create({
  baseURL: BASE_URL,
});

applyAuthInterceptors(userApi);

export const sellerApi = axios.create({
  baseURL: `${BASE_URL}/seller`,
});

applyAuthInterceptors(sellerApi);
