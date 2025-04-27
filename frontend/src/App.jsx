import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Router from "./router";
import { setNavigate } from "./utils/navigation";

function App() {
  const nav = useNavigate();

  useEffect(() => {
    setNavigate(nav);
  }, [nav]);

  return <Router />;
}

export default App;
