import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { cn } from "@mern/utils";

const ICON_MAP = {
  edit: FaEdit,
  view: FaEye,
  delete: FaTrash,
};

const COLOR_MAP = {
  edit: "bg-yellow-500 hover:bg-yellow-500/50",
  view: "bg-green-500 hover:bg-green-500/50",
  delete: "bg-red-500 hover:bg-red-500/50",
};

const ActionIcon = ({ type = "edit", onClick, className = "", size = 18 }) => {
  const Icon = ICON_MAP[type] || FaEdit;

  return (
    <button
      onClick={onClick}
      className={cn(
        "p-1.5 rounded-md text-white transition-all shadow-md",
        COLOR_MAP[type],
        className
      )}
      aria-label={type}
    >
      <Icon size={size} className="text-gray-100" />
    </button>
  );
};

export default ActionIcon;
