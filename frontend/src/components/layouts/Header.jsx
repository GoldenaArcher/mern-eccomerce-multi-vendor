import React from "react";
import { cn } from "../../utils/cn";
import { MdEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { RiArrowDownSFill } from "react-icons/ri";
import {
  FaFacebookF,
  FaLinkedin,
  FaLock,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";

import UsFlag from "../../assets/img/us.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const user = {};

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8 font-semibold text-black">
              <li
                className={cn(
                  "flex relative justify-center items-center gap-2 text-sm",
                  "after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]"
                )}
              >
                <span>
                  <MdEmail />
                </span>
                <span>support@easy-shop.com</span>
              </li>
              <li
                className={cn(
                  "flex relative justify-center items-center gap-2 text-sm",
                  "after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]"
                )}
              >
                <span>
                  <IoIosCall />
                </span>
                <span>1-800-000-0000</span>
              </li>
            </ul>

            <div>
              <div className="flex justify-center items-center gap-10">
                <ul className="flex justify-center items-center gap-4 text-black">
                  <li>
                    <button type="button" aria-label="Facebook">
                      <FaFacebookF />
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label="Facebook">
                      <FaTwitter />
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label="Facebook">
                      <FaLinkedin />
                    </button>
                  </li>
                  <li>
                    <button type="button" aria-label="Facebook">
                      <FaYoutube />
                    </button>
                  </li>
                </ul>
                <div
                  className={cn(
                    "flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative",
                    "after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]",
                    "before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]"
                  )}
                >
                  <img
                    src={UsFlag}
                    alt="us-flag"
                    className="w-5 h-5 object-contain"
                  />
                  <span>
                    <RiArrowDownSFill />
                  </span>
                  <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                    <li>English</li>
                    <li>Chinese</li>
                  </ul>
                </div>

                {user ? (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/dashboard"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>Demo User</span>
                  </Link>
                ) : (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/dashboard"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
