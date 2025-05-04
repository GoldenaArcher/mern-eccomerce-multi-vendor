import React from "react";
import _ from "lodash";
import { FaEye, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cn } from "@mern/utils";

import Ratings from "../../shared/Ratings";
import { getBackendUrl } from "../../../utils/envUtils";

const ProductCard = ({
  animateMode = "translate",
  showIcons = true,
  product,
}) => {
  let productImg = getBackendUrl();

  if (product.thumbnailUrl) {
    productImg += product.thumbnailUrl;
  } else if (product.images && product.images.length > 0) {
    productImg += product.images[0];
  }

  return (
    <div
      className={cn("border group transition-all duration-500", {
        "hover:-translate-y-1 hover:shadow-md": animateMode === "translate",
        "opacity-100 hover:opacity-50": animateMode === "opacity",
      })}
    >
      <div className="relative overflow-hidden">
        <div
          className={cn({
            "flex justify-center items-center absolute text-white size-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2":
              product.discount,
            hidden: !product.discount,
          })}
        >
          {product.discount}%
        </div>
        <img
          src={productImg}
          alt="product-image"
          className="w-full h-[240px] object-cover"
        />
        {showIcons && (
          <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
            <li className="size-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
              <FaRegHeart />
            </li>
            <li className="size-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
              <Link to={"/products/a"}>
                <FaEye />
              </Link>
            </li>
            <li className="size-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
              <FaShoppingCart />
            </li>
          </ul>
        )}
      </div>

      <div className="py-3 text-slate-600 px-2">
        <h2 className="font-bold">{product.name}</h2>
        <div className="flex justify-start items-center gap-3">
          <span className="font-semibold">${product.price}</span>
          <div className="flex">
            <Ratings ratings={_.random(0, 5, true)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
