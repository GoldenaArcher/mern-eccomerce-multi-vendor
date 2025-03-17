import { lazy } from "react";

const Home = lazy(() => import("../../pages/general/Home"));
const SellerDashboard = lazy(() => import("../../pages/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../../pages/seller/AddProduct"));

export const sellerRoutes = [
  { path: "/", element: <Home />, ability: ["admin", "seller"], },
  { path: "/seller/dashboard", element: <SellerDashboard />, role: 'seller', },
  { path: "/seller/add-product", element: <AddProduct />, role: 'seller', },
];
