import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import { authApi } from "./features/authApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(authApi.middleware);

    middlewares.push(logger);

    return middlewares;
  },
});

export default store;
