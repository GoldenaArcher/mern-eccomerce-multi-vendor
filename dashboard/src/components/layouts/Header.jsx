import React from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getBackendUrl } from "../../utils/envUtils";

const Header = ({ setShowSidebar }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all">
        <div
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
          onClick={() => {
            setShowSidebar((prev) => !prev);
          }}
        >
          <span>
            <FaList />
          </span>
        </div>

        <div className="hidden md:block">
          <input
            type="text"
            className="px-3 py-2 outline-none bg-transparent border border-slate-700 rounded-md text-[#423d72] focus:border-indigo-500 overflow-hidden"
            name="search"
            placeholder="search"
          />
        </div>

        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-base font-bold">{userInfo.name}</h2>
                <span className="text-[14px] w-full font-normal">
                  {userInfo.role}
                </span>
              </div>
              <img
                src={`${getBackendUrl()}${userInfo.image}`}
                alt="avatar"
                className="w-[45px] h-[45px] rounded-full overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
