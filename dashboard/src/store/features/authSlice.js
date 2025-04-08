import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import {
  clearAuthToken,
  handleGetUserInfoSuccess,
  handleLoginSuccess,
} from "../../utils/authHandler";

export const authInitialState = {
  accessToken: null,
  userInfo: {},
  isAdmin: false,
  isSeller: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: () => {
      clearAuthToken();
      return authInitialState;
    },
    updateToken: (state, { payload }) => {
      state.accessToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.adminLogin.matchFulfilled,
        (state, { payload }) => handleLoginSuccess(state, payload)
      )
      .addMatcher(
        authApi.endpoints.sellerRegister.matchFulfilled,
        (state, { payload }) => handleLoginSuccess(state, payload)
      )
      .addMatcher(
        authApi.endpoints.sellerLogin.matchFulfilled,
        (state, { payload }) => handleLoginSuccess(state, payload)
      )
      .addMatcher(
        authApi.endpoints.getCurrentAdmin.matchFulfilled,
        (state, { payload }) => handleGetUserInfoSuccess(state, payload)
      )
      .addMatcher(
        authApi.endpoints.getCurrentSeller.matchFulfilled,
        (state, { payload }) => handleGetUserInfoSuccess(state, payload)
      );
  },
});

export const { logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
