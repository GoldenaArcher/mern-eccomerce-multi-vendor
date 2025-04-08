import { authApi } from "./features/authApi";
import authReducer, { authSlice } from "./features/authSlice";
import { categoryApi } from "./features/categoryApi";
import { productApi } from "./features/productApi";

const rootReducer = {
  [authSlice.reducerPath]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
};

export default rootReducer;
