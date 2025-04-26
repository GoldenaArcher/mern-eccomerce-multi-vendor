import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { defaultToastOptions } from "@mern/utils";
import { PageLoader } from "@mern/ui";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Provider store={store}>
          <App />
          <Toaster toastOptions={defaultToastOptions} />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
