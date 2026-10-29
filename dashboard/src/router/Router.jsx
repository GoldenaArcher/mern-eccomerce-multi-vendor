import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/general/NotFound";

const Router = ({ allRoutes }) => {
  return (
    <Routes>
      {allRoutes.map(({ path, element, children }) => (
        <Route key={path} path={path} element={element}>
          {children?.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
