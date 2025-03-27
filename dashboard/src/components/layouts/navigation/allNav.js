import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdPayment, MdViewList } from "react-icons/md";
import { IoIosChatbubbles, IoMdAdd } from "react-icons/io";
import { TbBasketDiscount } from "react-icons/tb";
import { BsCartCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

// prettier-ignore
export const allNav = [
  { id: 1,  title: "Dashboard",                icon: <AiOutlineDashboard />,              role: "admin",  path: '/admin/dashboard' },
  { id: 2,  title: "Orders",                   icon: <AiOutlineShoppingCart />,           role: "admin",  path: '/admin/orders' },
  { id: 3,  title: "Category",                 icon: <BiSolidCategory />,                 role: "admin",  path: '/admin/categories' },
  { id: 4,  title: "Sellers",                  icon: <FaUsers />,                         role: "admin",  path: '/admin/sellers' },
  { id: 5,  title: "Payment Request",          icon: <MdPayment />,                       role: "admin",  path: '/admin/payments/request' },
  { id: 6,  title: "Deactivate Sellsers",      icon: <FaUserTimes />,                     role: "admin",  path: '/admin/sellers/deactivate' },
  { id: 7,  title: "Seller Request",           icon: <FaCodePullRequest />,               role: "admin",  path: '/admin/seller/requests' },
  { id: 8,  title: "Live Chat",                icon: <IoIosChatbubbles />,                role: "admin",  path: '/admin/seller/chat' },
  { id: 9,  title: "Dashboard",                icon: <AiOutlineDashboard />,              role: "seller", path: '/seller/dashboard' },
  { id: 10, title: "Add Product",              icon: <IoMdAdd />,                         role: "seller", path: '/seller/products/add' },
  { id: 11, title: "All Product",              icon: <MdViewList />,                      role: "seller", path: '/seller/products' },
  { id: 13, title: "Discount Product",         icon: <TbBasketDiscount />,                role: "seller", path: '/seller/products/discount' },
  { id: 14, title: "Orders",                   icon: <BsCartCheck />,                     role: "seller", path: '/seller/orders' },
  { id: 15, title: "Payments",                 icon: <MdPayment />,                       role: "seller", path: '/seller/payments' },
  { id: 16, title: "Chat Customer",            icon: <HiChatBubbleLeftRight />,           role: "seller", path: '/seller/chat/customer' },
  { id: 17, title: "Chat Support",             icon: <IoIosChatbubbles />,                role: "seller", path: '/seller/chat/support' },
  { id: 12, title: "Profile",                  icon: <CgProfile />,                       role: "seller", path: '/seller/profile' },
];
