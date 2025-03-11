import React from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoute";
import { getRoutes } from "./router/routes";

function App() {
  const allRoutes = [...publicRoutes, getRoutes()];

  return <Router allRoutes={allRoutes} />;
}

export default App;
