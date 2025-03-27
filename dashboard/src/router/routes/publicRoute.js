import { lazy } from "react";

const Login             =   lazy(() => import("../../pages/auth/Login"));
const AdminLogin        =   lazy(() => import("../../pages/auth/AdminLogin"));
const Register          =   lazy(() => import("../../pages/auth/Register"));
const Home              =   lazy(() => import("../../pages/general/Home"));
const Unauthorized      =   lazy(() => import("../../pages/general/Unauthorized"));

const publicRoutes = [
  { path: "/login",         element: <Login /> },
  { path: "/admin/login",   element: <AdminLogin /> },
  { path: "/register",      element: <Register /> },
  { path: "/unauthorized",  element: <Unauthorized /> },
  { path: "/",              element: <Home />,       ability: ["admin", "seller"], },
];

export default publicRoutes;
