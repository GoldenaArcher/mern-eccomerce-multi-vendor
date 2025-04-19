import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Rating = ({ ratings = 0, total = 5 }) => {
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

  return <div className="flex gap-[1px]">{stars}</div>;
};

export default Rating;
