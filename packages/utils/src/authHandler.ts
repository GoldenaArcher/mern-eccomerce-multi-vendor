import { AuthState, GetUserInfoPayload, LoginSuccessPayload } from "./types";

let currentAccessToken: null | string = null;

export const storeAuthToken = (token: string) => {
  currentAccessToken = token;
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  return currentAccessToken || localStorage.getItem("authToken");
};

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const handleLoginSuccess = (
  state: AuthState,
  payload: LoginSuccessPayload
) => {
  const { accessToken, user } = payload.data;

  state.accessToken = accessToken;
  state.userInfo = user;
  state.isAdmin = user.role === "admin";
  state.isSeller = user.role === "seller";
  storeAuthToken(accessToken);
};

export const handleGetUserInfoSuccess = (
  state: AuthState,
  payload: GetUserInfoPayload
) => {
  const { message, ...userInfo } = payload.data;
  state.userInfo = userInfo;
};
