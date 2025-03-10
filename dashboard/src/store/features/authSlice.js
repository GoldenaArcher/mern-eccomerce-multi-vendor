import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {},
  },
  reducers: {},
});

export default authSlice.reducer;
