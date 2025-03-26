import React from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoute";
import { getRoutes } from "./router/routes";
import { useGetCurrentUserQuery } from "./hooks/useGetCurrentUserQuery";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

function App() {
  const allRoutes = [...publicRoutes, getRoutes()];

  useGetCurrentUserQuery();

  useAuthRedirect();

  return <Router allRoutes={allRoutes} />;
}

export default App;
