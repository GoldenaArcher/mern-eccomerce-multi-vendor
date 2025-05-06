import { categoryApi } from "./features/categoryApi";
import { featuredProductApi } from "./features/featuredProductApi";
import { productApi } from "./features/productApi";
import { shopApi } from "./features/shopApi";

const rootReducer = {
  [categoryApi.reducerPath]: categoryApi.reducer,
  [featuredProductApi.reducerPath]: featuredProductApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
};

export default rootReducer;
