import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

export const authInitialState = {
  accessToken: null,
  userInfo: {},
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("authToken");
      return authInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.adminLogin.matchFulfilled,
      (state, { payload: { accessToken, user } }) => {
        state.accessToken = accessToken;
        state.userInfo = user;
        state.isAdmin = user.role === "admin";
        localStorage.setItem("authToken", accessToken);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
