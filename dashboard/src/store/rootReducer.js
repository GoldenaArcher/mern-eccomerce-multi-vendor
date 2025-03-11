import { authApi } from "./features/authApi";
import authReducer, { authSlice } from "./features/authSlice";

const rootReducer = {
  [authSlice.reducerPath]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
};

export default rootReducer;
