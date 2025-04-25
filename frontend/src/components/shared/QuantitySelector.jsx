import React from "react";
import { cn } from "@mern/utils";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = ({ className }) => {
  return (
    <div
      className={cn(
        "flex bg-slate-200 h-[30px] justify-center items-center text-xl rounded-md",
        className
      )}
    >
      <div className="px-3 cursor-pointer">
        <FaMinus />
      </div>
      <div className="px-3">2</div>
      <div className="px-3 cursor-pointer">
        <FaPlus />
      </div>
    </div>
  );
};

export default QuantitySelector;
