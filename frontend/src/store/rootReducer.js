import { categoryApi } from "./features/categoryApi";
import { featuredProductApi } from "./features/featuredProductApi";

const rootReducer = {
  [categoryApi.reducerPath]: categoryApi.reducer,
  [featuredProductApi.reducerPath]: featuredProductApi.reducer,
};

export default rootReducer;
