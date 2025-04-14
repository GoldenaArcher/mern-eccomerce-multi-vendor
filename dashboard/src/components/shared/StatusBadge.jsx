import React from "react";
import { cn } from "../../utils/cn";

const STATUS_STYLES = {
  active: "bg-green-600 text-white",
  inactive: "bg-red-600 text-white",
  pending: "bg-blue-600 text-white",
  default: "bg-gray-400 text-white",
};

const StatusBadge = ({ status = "default", children }) => {
  const className =
    STATUS_STYLES[status.toLowerCase()] || STATUS_STYLES.default;

  return (
    <span
      className={cn(
        "text-xs font-semibold px-3 py-0.5 rounded-full inline-block shadow",
        className
      )}
    >
      {status}
      {children}
    </span>
  );
};

export default StatusBadge;
