import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { PuffLoader } from "react-spinners";

import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

const LoadingSpinner = () => (
  <div style={styles.loaderContainer}>
    <PuffLoader color="#3498db" size={60} />
  </div>
);

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Provider store={store}>
          <App />
          <Toaster
            toastOptions={{
              position: "top-right",
              style: {
                background: "#283046",
                color: "white",
              },
            }}
          />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
