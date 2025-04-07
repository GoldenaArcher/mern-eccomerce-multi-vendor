import { authApi } from "./features/authApi";
import authReducer, { authSlice } from "./features/authSlice";
import { categoryApi } from "./features/categoryApi";

const rootReducer = {
  [authSlice.reducerPath]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
};

export default rootReducer;
