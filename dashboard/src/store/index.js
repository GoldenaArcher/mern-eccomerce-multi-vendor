import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import { authApi } from "./features/authApi";
import { rehydrateJwtToken } from "../utils/jwtUtils";
import { categoryApi } from "./features/categoryApi";
import { productApi } from "./features/productApi";

const rehydratedAuthState = rehydrateJwtToken();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      productApi.middleware
    );

    middlewares.push(logger);

    return middlewares;
  },
  preloadedState: {
    auth: rehydratedAuthState,
  },
});

export default store;
