import React from "react";
import ActionIcon from "./ActionIcon";
import { cn } from "@mern/utils";

const InfoCard = ({ data = [], editable = false, onEdit, isDark = true }) => {
  return (
    <div
      className={cn(
        "flex justify-between text-sm flex-col gap-2 p-4 rounded-md relative",
        isDark ? "bg-slate-700 text-slate-100" : "bg-[#9e97e9] text-black"
      )}
    >
      {editable && (
        <ActionIcon
          type="edit"
          className="absolute right-2 top-2"
          onClick={onEdit}
        />
      )}

      {data.map(({ label, value, className = "" }) => (
        <div className="flex gap-2" key={label}>
          <p>
            <span>{label}: </span>
            <span className={className}>{value}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
