import { lazy } from "react";

const Home = lazy(() => import("../../pages/general/Home"));
const AdminDashboard = lazy(() => import("../../pages/admin/AdminDashboard"));
const Orders = lazy(() => import("../../pages/admin/Orders"));
const Category = lazy(() => import("../../pages/admin/Category"));
const Sellers = lazy(() => import("../../pages/admin/Sellers"));
const PaymentRequests = lazy(() => import("../../pages/admin/PaymentRequests"));
const DeactivateSellers = lazy(() => import("../../pages/admin/DeactivateSellers"));
const SellerRequests = lazy(() => import("../../pages/admin/SellerRequests"));
const SellerDetails = lazy(() => import("../../pages/admin/SellerDetails"));
const ChatSellers = lazy(() => import("../../pages/admin/ChatSellers"));
const OrderDetails = lazy(() => import("../../pages/admin/OrderDetails"));

export const adminRoutes = [
  { path: "/",                              element: <Home />,              ability: ["admin", "seller"], },
  { path: "admin/dashboard",                element: <AdminDashboard />,    role: "admin", },
  { path: "admin/orders",                   element: <Orders />,            role: "admin", },
  { path: "admin/categories",               element: <Category />,          role: "admin", },
  { path: "admin/sellers",                  element: <Sellers />,           role: "admin", },
  { path: "admin/payments/request",         element: <PaymentRequests />,   role: "admin", },
  { path: "admin/sellers/deactivate",       element: <DeactivateSellers />, role: "admin", },
  { path: "admin/seller/requests",          element: <SellerRequests />,    role: "admin", },
  { path: "admin/seller/details/:sellerId", element: <SellerDetails />,     role: "admin", },
  { path: "admin/seller/chat",              element: <ChatSellers />,       role: "admin", },
  { path: "admin/order/details/:orderId",   element: <OrderDetails />,      role: "admin", },
];
