import React from "react";

const StatGrid = ({
  children,
  columns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4",
  gap = "gap-7",
  className = "",
}) => {
  return (
    <div className={`w-full grid ${columns} ${gap} ${className}`}>
      {children}
    </div>
  );
};

const StatCard = ({
  title,
  subtitle,
  icon: Icon,
  cardBg = "#f5f5f5",
  iconBg = "#333",
  textColor = "#5c5a5a",
}) => {
  return (
    <div
      className="flex justify-between items-center p-5 rounded-md gap-3"
      style={{ backgroundColor: cardBg }}
    >
      <div
        className="flex flex-col justify-start items-start"
        style={{ color: textColor }}
      >
        <h2 className="text-3xl font-bold">{title}</h2>
        <span className="text-md font-medium">{subtitle}</span>
      </div>
      <div
        className="w-[40px] h-[47px] rounded-full flex justify-center items-center text-xl"
        style={{ backgroundColor: iconBg }}
      >
        {Icon && <Icon className="text-[#fae8e8] shadow-lg" />}
      </div>
    </div>
  );
};

StatGrid.Card = StatCard;
export default StatGrid;
