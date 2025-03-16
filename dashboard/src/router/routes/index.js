import MainLayout from "../../components/layouts/MainLayout";

const { privateRoutes } = require("./privateRoutes");

export const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: [...privateRoutes],
  };
};
