import { Routes, Route } from "react-router-dom";

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
    </Routes>
  );
};

export default Router;
