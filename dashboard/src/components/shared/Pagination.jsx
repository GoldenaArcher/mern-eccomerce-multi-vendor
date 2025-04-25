import React from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { cn } from "@mern/utils";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  perPage,
  showItems,
  className,
}) => {
  const totalPage = Math.ceil(totalItems / perPage);

  let startPage = Math.max(1, currentPage - Math.floor(showItems / 2));
  let endPage = startPage + showItems - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, endPage - showItems + 1);
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          key={i}
          className={`${
            currentPage === i
              ? "bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white"
              : "bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
          } size-[33px] rounded-full flex justify-center items-center cursor-pointer select-none`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul
      className={cn(
        "flex gap-3 select-none w-full justify-end mt-4 bottom-4 right-4",
        className
      )}
    >
      {currentPage > 1 && (
        <li className="size-[33px] rounded-full flex justify-center items-center bg-slate-300 text-black hover:cursor-pointer select-none">
          <MdOutlineKeyboardDoubleArrowLeft
            onClick={() => setCurrentPage((prev) => prev - 1)}
          />
        </li>
      )}

      {createBtn()}

      {currentPage < totalPage && (
        <li className="size-[33px] rounded-full flex justify-center items-center bg-slate-300 text-black hover:cursor-pointer select-none">
          <MdOutlineKeyboardDoubleArrowRight
            onClick={() => setCurrentPage((prev) => prev + 1)}
          />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
