import MainLayout from "../../layouts/MainLayout";

const { privateRoutes } = require("./privateRoutes");

export const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: [...privateRoutes],
  };
};
