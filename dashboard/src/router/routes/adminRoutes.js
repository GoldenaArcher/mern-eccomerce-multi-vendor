import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../pages/admin/AdminDashboard"));
const Orders = lazy(() => import("../../pages/admin/Orders"));
const Category = lazy(() => import("../../pages/admin/Category"));
const Sellers = lazy(() => import("../../pages/admin/Sellers"));
const PaymentRequests = lazy(() => import("../../pages/admin/PaymentRequests"));

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "admin/categories",
    element: <Category />,
    role: "admin",
  },
  {
    path: "admin/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "admin/payment-requests",
    element: <PaymentRequests />,
    role: "admin",
  },
];
