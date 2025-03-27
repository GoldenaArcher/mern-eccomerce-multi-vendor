import MainLayout from "../../components/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const { privateRoutes } = require("./privateRoutes");

export const getRoutes = () => {
  privateRoutes.forEach((route) => {
    route.element = (
      <ProtectedRoute key={route.path} {...route}>
        {route.element}
      </ProtectedRoute>
    );
  });

  return {
    path: "/",
    element: <MainLayout />,
    children: [...privateRoutes],
  };
};
