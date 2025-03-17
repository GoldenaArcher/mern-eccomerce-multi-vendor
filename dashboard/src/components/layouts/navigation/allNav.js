import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";

// prettier-ignore
export const allNav = [
  { id: 1,  title: "Dashboard",                icon: <AiOutlineDashboard />,       role: "admin",  path: '/admin/dashboard' },
  { id: 2,  title: "Orders",                   icon: <AiOutlineShoppingCart />,    role: "admin",  path: '/admin/orders' },
  { id: 3,  title: "Category",                 icon: <BiSolidCategory />,          role: "admin",  path: '/admin/categories' },
  { id: 4,  title: "Sellers",                  icon: <FaUsers />,                  role: "admin",  path: '/admin/sellers' },
  { id: 5,  title: "Payment Request",          icon: <MdPayment />,                role: "admin",  path: '/admin/payment-requests' },
  { id: 6,  title: "Deactivate Sellsers",      icon: <FaUserTimes />,              role: "admin",  path: '/admin/deactivate-sellers' },
  { id: 7,  title: "Seller Request",           icon: <FaCodePullRequest />,        role: "admin",  path: '/admin/seller/requests' },
  { id: 8,  title: "Live Chat",                icon: <IoIosChatbubbles />,         role: "admin",  path: '/admin/seller/chat' },
  { id: 9,  title: "Dashboard",                icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/dashboard' },
  { id: 10, title: "Add Product",              icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/add-product' },
  { id: 11, title: "All Product",              icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/all-product' },
  { id: 12, title: "All Product",              icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/all-product' },
  { id: 13, title: "Discount Product",         icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/discount-product' },
  { id: 14, title: "Orders",                   icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/orders' },
  { id: 15, title: "Payments",                 icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/payments' },
  { id: 16, title: "Chat Customer",            icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/customer/chat' },
  { id: 17, title: "Chat Support",             icon: <AiOutlineDashboard />,       role: "seller", path: '/seller/support/chat' },
];
