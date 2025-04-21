import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { cn } from "../../utils/cn";

const Ratings = ({
  ratings = 0,
  total = 5,
  className = "",
  onClick = null,
}) => {
  const stars = [];

  for (let i = 1; i <= total; i++) {
    if (ratings >= i) {
      stars.push(<FaStar key={i} className="text-[#EDBB0E]" />);
    } else if (ratings >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-[#EDBB0E]" />);
    } else {
      stars.push(<CiStar key={i} className="text-slate-600" />);
    }
  }

  return (
    <div className={cn("flex gap-px", className, onClick && "cursor-pointer")}>
      {stars}
    </div>
  );
};

export default Ratings;
