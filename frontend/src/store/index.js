import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import { categoryApi } from "./features/categoryApi";
import { featuredProductApi } from "./features/featuredProductApi";
import { shopApi } from "./features/shopApi";
import { productApi } from "./features/productApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(
      categoryApi.middleware,
      featuredProductApi.middleware,
      shopApi.middleware,
      productApi.middleware
    );

    middlewares.concat(logger);

    return middlewares;
  },
});
export default store;
