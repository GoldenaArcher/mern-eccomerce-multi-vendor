import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";

import Logo from "../../assets/img/logo.png";
import { getNav } from "./navigation";
import { logout } from "../../store/features/authSlice";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [allNav, setAllNav] = useState([]);

  useEffect(() => {
    const nav = getNav("admin");
    setAllNav(nav);
  }, []);

  return (
    <div>
      <div
        className={`flex duration-200 ${
          showSidebar ? "opacity-100 visible" : "opacity-0 hidden"
        } w-screen h-screen bg-[#8cbce7] top-0 left-0 z-10`}
        onClick={() => {
          setShowSidebar(false);
        }}
      ></div>
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img src={Logo} alt="easy-shop" className="w-full h-full" />
          </Link>
        </div>

        <div className="px-[16px]">
          <ul>
            {allNav.map(({ icon, title, path }, i) => (
              <li key={i}>
                <Link
                  to={path}
                  className={`${
                    pathname === path
                      ? "bg-blue-600 shadow-indigo-500/50 text-white duration-500"
                      : "text-[#030811] font-bold duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                className={`text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <span>
                  <BiLogOutCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
