import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoIosArrowDown, IoIosCall } from "react-icons/io";
import { RiArrowDownSFill } from "react-icons/ri";
import {
  FaAngleRight,
  FaFacebookF,
  FaHeart,
  FaLinkedin,
  FaList,
  FaLock,
  FaPhoneAlt,
  FaShoppingCart,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@mern/utils";
import { useDebouncedSearch } from "@mern/hooks";

import UsFlag from "../../assets/img/us.svg";
import Logo from "../../assets/img/logo.png";
import { navigation } from "./navigation";

const dummyCategories = [
  "All Categories",
  "Accessories",
  "Clothing",
  "Shoes",
  "Electronics",
  "Furniture",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Automotive",
];

const Header = () => {
  const { pathname } = useLocation();
  const user = {};
  const [showSideBar, setShowSideBar] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const wishlist = [1, 2, 3];
  const [selectedCategories, setSelectedCategories] = useState("");
  const { searchValue, setSearchValue, debouncedSearch } = useDebouncedSearch();

  const getSupportInfo = (isMobile) => (
    <ul
      className={cn(
        "flex justify-start items-center gap-8 font-semibold text-black",
        isMobile && "flex-col"
      )}
    >
      <li
        className={cn(
          "flex relative justify-center items-center gap-2 text-sm",
          !isMobile &&
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
          !isMobile &&
            "after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]"
        )}
      >
        <span>
          <IoIosCall />
        </span>
        <span>1-800-000-0000</span>
      </li>
    </ul>
  );

  const getSocialLinks = () => (
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
  );

  const getLanguageSelection = (isMobile) => (
    <div
      className={cn(
        "flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative",
        "after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]",
        !isMobile &&
          "before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]"
      )}
    >
      <img src={UsFlag} alt="us-flag" className="size-5 object-contain" />
      <span>
        <RiArrowDownSFill />
      </span>
      <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-40">
        <li>English</li>
        <li>Chinese</li>
      </ul>
    </div>
  );

  const getUserProfile = () =>
    user ? (
      <Link
        className={cn(
          "flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
        )}
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
    );

  const getNavigation = ({
    forMobileSidebar = false,
    forDesktopHeader = false,
  }) => {
    if (!forMobileSidebar && !forDesktopHeader) return null;

    return (
      <ul
        className={cn(
          "flex justify-start items-start gap-4 text-sm font-bold uppercase",
          {
            "md-lg:hidden": forDesktopHeader,
            "flex-col gap-6": forMobileSidebar,
          }
        )}
      >
        {navigation.map(({ id, path, title, icon }) => (
          <li key={id}>
            <Link
              to={path}
              className={cn(
                "flex items-center gap-2",
                {
                  "text-[#059473]": pathname === path,
                  "text-slate-600": pathname !== path,
                },
                {
                  "py-2": forMobileSidebar,
                  "p-2": forDesktopHeader,
                }
              )}
            >
              <span
                className={cn("text-base", !forMobileSidebar && "xl:hidden")}
              >
                {icon}
              </span>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            {getSupportInfo()}
            <div>
              <div className="flex justify-center items-center gap-10">
                {getSocialLinks()}
                {getLanguageSelection()}
                {getUserProfile()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img src={Logo} alt="logo" />
                </Link>

                <div
                  className={cn(
                    "flex justify-center items-center w-[30px] h-[30px] rounded-sm cursor-pointer",
                    "bg-white text-slate-600 border border-l-slate-600",
                    "lg:hidden md-lg:flex xl:hidden hidden"
                  )}
                  onClick={() => setShowSideBar((prev) => !prev)}
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>

            <div className="md-lg:w-full w-9/12 md-lg:pt-4">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                {getNavigation({ forDesktopHeader: true })}
                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div className="relative flex justify-center items-center cursor-pointer size-[35px] rounded-full bg-[#e2e2e2] hover:bg-[#d4d4d4] transition-all duration-300 ease-in-out">
                      <span className="text-xl text-green-500 hover:scale-150 transition-all duration-300 ease-in-out">
                        <FaHeart />
                      </span>
                      <div className="size-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center top-[-3px] right-[-5px]">
                        {wishlist.length}
                      </div>
                    </div>
                    <Link to="/cart">
                      <div className="relative flex justify-center items-center cursor-pointer size-[35px] rounded-full bg-[#e2e2e2] hover:bg-[#d4d4d4] transition-all duration-300 ease-in-out">
                        <span className="text-xl text-green-500 hover:scale-150 transition-all duration-300 ease-in-out">
                          <FaShoppingCart />
                        </span>
                        <div className="size-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center top-[-3px] right-[-5px]">
                          {wishlist.length}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-lg:block">
        <div
          className={cn(
            "fixed transition-all duration-200 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-20 top-0 left-0",
            {
              invisible: !showSideBar,
              visible: showSideBar,
            }
          )}
          onClick={() => setShowSideBar((prev) => !prev)}
        ></div>
        <div
          className={cn(
            "w-[300px] z-30 transition-all duration-200 fixed overflow-auto bg-white h-screen py-6 px-8 overflow-y-auto",
            {
              "-left-[300px]": !showSideBar,
              "left-0 top-0": showSideBar,
            }
          )}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
            <div className="flex justify-start items-center gap-10">
              {getLanguageSelection(true)}
              {getUserProfile()}
            </div>
            {getNavigation({ forMobileSidebar: true })}
            {getSocialLinks()}
            {getSupportInfo(true)}
          </div>
        </div>
      </div>

      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                className="h-[50px] bg-[#059473] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-base cursor-pointer"
                onClick={() => setShowCategories((prev) => !prev)}
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>All Categories</span>
                </div>
                <span
                  className={cn(
                    "transition-transform duration-300",
                    showCategories && "rotate-180"
                  )}
                >
                  <IoIosArrowDown />
                </span>
              </div>

              <div
                className={cn(
                  "overflow-y-auto overflow-x-hidden transition-all md-lg:relative duration-500 absolute z-10 w-full border-x bg-[#dbf3ed] text-white",
                  {
                    "h-0": !showCategories,
                    "max-h-[400px]": showCategories,
                  }
                )}
              >
                <ul>
                  {dummyCategories.map((category, index) => {
                    return (
                      <li
                        key={index}
                        className={cn(
                          "flex justify-between items-center px-6 py-3 text-slate-800",
                          index !== 0 && "border-t",
                          index === dummyCategories.length - 1 && "border-b"
                        )}
                      >
                        <span>{category}</span>
                        <span>
                          <FaAngleRight />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap justify-between items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className="flex border border-gray-300 h-[50px] items-center relative gap-6">
                  <div className="relative after:absolute after:h-[25px] after:w-px after:bg-[#afafaf] after:right-[-15px] md-lg:hidden">
                    <select
                      name=""
                      id=""
                      className="outline-none w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full border-none"
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue}
                    >
                      <option value="">Select Category</option>
                      {dummyCategories.map((category, index) => {
                        return (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="relative size-full bg-transparent text-slate-500 outline-none px-3"
                    placeholder="Search Products"
                  />
                  <button className="bg-[#059473] right-0 absolute px-8 h-full font-semibold uppercase text-white">
                    Search
                  </button>
                </div>
              </div>

              <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
                <div
                  className={cn(
                    "flex relative justify-center items-center gap-2 text-sm"
                  )}
                >
                  <div className="size-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                    <span>
                      <FaPhoneAlt />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col gap-1">
                    <h2 className="text-base font-medium text-slate-700">
                      1-800-000-0000
                    </h2>
                    <span className="text-xs">Support 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
