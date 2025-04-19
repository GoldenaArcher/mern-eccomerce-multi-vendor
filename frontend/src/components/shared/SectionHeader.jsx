import React from "react";
import { cn } from "../../utils/cn";

const SectionHeader = ({ title, className = "", hideDivider = false }) => {
  return (
    <div className={"w-full"}>
      <div
        className={cn(
          "text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]",
          className
        )}
      >
        <h2>{title}</h2>
        {!hideDivider && (
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
