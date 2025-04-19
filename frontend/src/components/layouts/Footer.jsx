import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

import Logo from "../../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#f3f6fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6 justify-between">
        <div className="w-3/12 lg:w-3/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <Link to="/">
              <img src={Logo} alt="logo" className="w-[190px]" />
            </Link>
            <ul className="flex flex-col gap-2 text-slate-600">
              <li>Address: 1729 Elmwood Ave, Evanston, IL, 60201</li>
              <li>Phone: (123)345-8902</li>
              <li>Email: EMAIL@email.com</li>
            </ul>
          </div>
        </div>

        <div className="w-4/12 lg:w-7/12 sm:w-full">
          <div className="flex flex-col justify-center sm:justify-start sm:mt-6 w-full">
            <h2 className="font-bold text-lg mb-2">Useful Links</h2>
            <div className="flex gap-[80px] lg:gap-[40px]">
              <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                <li>
                  <Link to={"/dummy"}>About Us</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>About Our Shop</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>Delivery Information</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>Blogs</Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                <li>
                  <Link to={"/dummy"}>About Us</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>About Our Shop</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>Delivery Information</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>Privacy Policy</Link>
                </li>
                <li>
                  <Link to={"/dummy"}>Blogs</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Join Us</h2>
            <span>Get email updates about our latest and special offers</span>
            <div className="h-[50px] w-full bg-white border relative">
              <input
                type="text"
                className="bg-transparent w-full p-3 outline-none"
                placeholder="Enter Your Email"
              />
              <button className="h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>

            <ul className="flex justify-start items-center gap-3">
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
          </div>
        </div>
      </div>

      <div className="w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>Copyright &copy; 2025 All Rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
