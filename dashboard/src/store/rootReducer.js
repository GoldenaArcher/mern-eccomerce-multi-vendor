import { authApi } from "./features/authApi";
import authReducer, { authSlice } from "./features/authSlice";
import { categoryApi } from "./features/categoryApi";
import { productApi } from "./features/productApi";
import { sellerApi } from "./features/sellerApi";
import { shopApi } from "./features/shopApi";
import { userApi } from "./features/userApi";

const rootReducer = {
  [authSlice.reducerPath]: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [sellerApi.reducerPath]: sellerApi.reducer
};

export default rootReducer;
