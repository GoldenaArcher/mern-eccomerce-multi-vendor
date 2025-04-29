import { categoryApi } from "./features/categoryApi";
import { featuredProductApi } from "./features/featuredProductApi";
import { shopApi } from "./features/shopApi";

const rootReducer = {
  [categoryApi.reducerPath]: categoryApi.reducer,
  [featuredProductApi.reducerPath]: featuredProductApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
};

export default rootReducer;
