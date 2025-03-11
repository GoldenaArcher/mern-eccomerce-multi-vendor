import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
  token: null,
  userInfo: {},
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("authToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.adminLogin.matchFulfilled,
      (state, { payload: { token, user } }) => {
        state.token = token;
        state.userInfo = user;
        state.isAdmin = user.role === "admin";
        localStorage.setItem("authToken", token);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
