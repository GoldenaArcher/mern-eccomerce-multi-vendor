import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";

// prettier-ignore
export const allNav = [
  { id: 1, title: "Dashboard",              icon: <AiOutlineDashboard />,       role: "admin", path: '/admin/dashboard' },
  { id: 2, title: "Orders",                 icon: <AiOutlineShoppingCart />,    role: "admin", path: '/admin/dashboard/orders' },
  { id: 3, title: "Category",               icon: <BiSolidCategory />,          role: "admin", path: '/admin/dashboard/category' },
  { id: 4, title: "Sellers",                icon: <FaUsers />,                  role: "admin", path: '/admin/dashboard/sellers' },
  { id: 5, title: "Payment Request",        icon: <MdPayment />,                role: "admin", path: '/admin/dashboard/sellers' },
  { id: 6, title: "Deactivate Sellsers",    icon: <FaUserTimes />,              role: "admin", path: '/admin/dashboard/deactive-sellers' },
  { id: 6, title: "Seller Request",         icon: <FaCodePullRequest />,        role: "admin", path: '/admin/dashboard/sellers-request' },
  { id: 6, title: "Live Chat",              icon: <IoIosChatbubbles />,         role: "admin", path: '/admin/dashboard/chat-seller' },
];
