import React, { useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoute";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
