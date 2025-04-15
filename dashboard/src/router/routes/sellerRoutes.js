import { lazy } from "react";

const SellerDashboard   =   lazy(() => import("../../pages/seller/SellerDashboard"));
const AddProduct        =   lazy(() => import("../../pages/seller/AddProduct"));
const Products          =   lazy(() => import("../../pages/seller/Products"));
const DiscountProduct   =   lazy(() => import("../../pages/seller/DiscountProduct"));
const Orders            =   lazy(() => import("../../pages/seller/Orders"));
const Payments          =   lazy(() => import("../../pages/seller/Payments"));
const ChatCustomer      =   lazy(() => import("../../pages/seller/ChatCustomer"));
const ChatSupport       =   lazy(() => import("../../pages/seller/ChatSupport"));
const Profile           =   lazy(() => import("../../pages/seller/Profile"));
const EditProduct       =   lazy(() => import("../../pages/seller/EditProduct"));
const OrderDetails      =   lazy(() => import("../../pages/seller/OrderDetails"));
const Pending           =   lazy(() => import("../../pages/seller/Pending"));
const Inactive          =   lazy(() => import("../../pages/seller/Inactive"));

export const sellerRoutes = [
  { path: "/seller/dashboard",                     element: <SellerDashboard />,   role: 'seller',   status: 'active', },
  { path: "/seller/products/add",                  element: <AddProduct />,        role: 'seller',   status: 'active', },
  { path: "/seller/products/edit/:productId",      element: <EditProduct />,       role: 'seller',   status: 'active', },
  { path: "/seller/products",                      element: <Products />,          role: 'seller',   status: 'active', },
  { path: "/seller/products/discount",             element: <DiscountProduct />,   role: 'seller',   status: 'active', },
  { path: "/seller/orders",                        element: <Orders />,            role: 'seller',   visibility: ['active', 'inactive'], }, 
  { path: "/seller/orders/:orderId",               element: <OrderDetails />,      role: 'seller',   visibility: ['active', 'inactive'], }, 
  { path: "/seller/payments",                      element: <Payments />,          role: 'seller',   status: 'active', },
  { path: "/seller/chat/customer",                 element: <ChatCustomer />,      role: 'seller',   status: 'active', },
  { path: "/seller/chat/customer/:id",             element: <ChatCustomer />,      role: 'seller',   status: 'active', },
  { path: "/seller/chat/support",                  element: <ChatSupport />,       role: 'seller',   visibility: ['active', 'inactive', 'pending'], },
  { path: "/seller/profile",                       element: <Profile />,           role: 'seller',   visibility: ['active', 'inactive', 'pending'], },
  { path: "/seller/account/pending",               element: <Pending />,           role: 'seller',   status: 'pending', },
  { path: "/seller/account/inactive",              element: <Inactive />,          role: 'seller',   status: 'inactive', },
];
