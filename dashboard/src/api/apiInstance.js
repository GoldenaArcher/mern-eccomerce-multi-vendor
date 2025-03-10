import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const adminApi = axios.create({
  baseURL: `${BASE_URL}/admin`,
});
