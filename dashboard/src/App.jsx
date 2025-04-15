import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoute";
import { getRoutes } from "./router/routes";
import { useGetCurrentUserQuery } from "./hooks/useGetCurrentUserQuery";
import { useAuthRedirect } from "./hooks/useAuthRedirect";
import { setNavigate } from "./utils/navigation";

function App() {
  const nav = useNavigate();

  useEffect(() => {
    setNavigate(nav);
  }, [nav]);

  const allRoutes = [...publicRoutes, getRoutes()];

  useGetCurrentUserQuery();
  useAuthRedirect();

  return <Router allRoutes={allRoutes} />;
}

export default App;
