import { lazy } from "react";

const Home              =   lazy(() => import("../../pages/general/Home"));
const SellerDashboard   =   lazy(() => import("../../pages/seller/SellerDashboard"));
const AddProduct        =   lazy(() => import("../../pages/seller/AddProduct"));
const Products          =   lazy(() => import("../../pages/seller/Products"));
const DiscountProduct   =   lazy(() => import("../../pages/seller/DiscountProduct"));
const Orders            =   lazy(() => import("../../pages/seller/Orders"));
const Payments          =   lazy(() => import("../../pages/seller/Payments"));
const ChatCustomer      =   lazy(() => import("../../pages/seller/ChatCustomer"));
const ChatSupport       =   lazy(() => import("../../pages/seller/ChatSupport"));
const Profile           =   lazy(() => import("../../pages/seller/Profile"));

export const sellerRoutes = [
  { path: "/",                          element: <Home />,              ability: ["admin", "seller"],                     },
  { path: "/seller/dashboard",          element: <SellerDashboard />,   role: 'seller',   status: 'active', },
  { path: "/seller/products/add",       element: <AddProduct />,        role: 'seller',   status: 'active', },
  { path: "/seller/products",           element: <Products />,          role: 'seller',   status: 'active', },
  { path: "/seller/products/discount",  element: <DiscountProduct />,   role: 'seller',   status: 'active', },
  { path: "/seller/orders",             element: <Orders />,            role: 'seller',   ability: ['active', 'inactive'], }, 
  { path: "/seller/payments",           element: <Payments />,          role: 'seller',   status: 'active', },
  { path: "/seller/chat/customer",      element: <ChatCustomer />,      role:'seller',    status: 'active', },
  { path: "/seller/chat/customer/:id",  element: <ChatCustomer />,      role:'seller',    status: 'active', },
  { path: "/seller/chat/support",       element: <ChatSupport />,       role:'seller',    ability: ['active', 'inactive', 'pending'], },
  { path: "/seller/profile",            element: <Profile />,           role:'seller',    status: 'active', },
];
