import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { clearAuthToken, handleLoginSuccess } from "../../utils/authHandler";

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
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
