import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { cn } from "../../utils/cn";

const sizeClassMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

const Ratings = ({
  ratings = 0,
  total = 5,
  className = "",
  size = "md",
  bright = false,
  onClick = null,
}) => {
  const baseSize = sizeClassMap[size] || sizeClassMap.md;

  const stars = [];

  for (let i = 1; i <= total; i++) {
    const isFull = ratings >= i;
    const isHalf = ratings >= i - 0.5;
    const isEmpty = !isFull && !isHalf;

    const starColorClass = isEmpty
      ? bright
        ? "text-slate-300"
        : "text-slate-600"
      : "text-[#EDBB0E]";

    const hasTextSizeClass = /text-(xs|sm|base|lg|xl|2xl|3xl|4xl)/.test(
      className
    );
    // If user passed text-*, we skip baseSize; else fallback to default size
    const finalSizeClass = hasTextSizeClass ? "" : baseSize;

    const star = isFull ? (
      <FaStar key={i} className={cn(finalSizeClass, starColorClass)} />
    ) : isHalf ? (
      <FaStarHalfAlt key={i} className={cn(finalSizeClass, starColorClass)} />
    ) : (
      <CiStar key={i} className={cn(finalSizeClass, starColorClass)} />
    );

    stars.push(star);
  }

  return (
    <div className={cn("flex gap-px", className, onClick && "cursor-pointer")}>
      {stars}
    </div>
  );
};

export default Ratings;
