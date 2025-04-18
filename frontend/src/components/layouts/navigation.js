import { FaHome, FaStore, FaBlog, FaPhone, FaInfo } from "react-icons/fa";

export const navigation = [
  { id: 1, title: "Home", path: "/", icon: <FaHome /> },
  { id: 2, title: "Shop", path: "/shop", icon: <FaStore /> },
  { id: 3, title: "Blog", path: "/blog", icon: <FaBlog /> },
  { id: 4, title: "About Us", path: "/about", icon: <FaInfo /> },
  { id: 5, title: "Contact Us", path: "/contact", icon: <FaPhone /> },
];
