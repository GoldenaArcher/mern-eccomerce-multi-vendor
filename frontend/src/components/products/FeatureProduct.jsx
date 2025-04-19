import React from "react";
import _ from "lodash";
import { FaEye, FaRegHeart, FaShoppingCart } from "react-icons/fa";

import SectionHeader from "../shared/SectionHeader";
import Ratings from "../shared/Ratings";

const FeatureProduct = () => {
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <SectionHeader title="Feature Products" />

      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {[1, 2, 3, 4, 5, 6, 7].map((__, i) => (
          <div
            key={i}
            className="border group transition-all duration-500 hover:shadow-md hover:mt-[-3px]"
          >
            <div className="relative overflow-hidden">
              <div className="flex justify-center items-center absolute text-white size-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                8%
              </div>
              <img
                src={`http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg`}
                alt="product-image"
                className="w-full h-[240px] object-cover"
              />
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li className="size-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                  <FaRegHeart />
                </li>
                <li className="size-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                  <FaEye />
                </li>
                <li className="size-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                  <FaShoppingCart />
                </li>
              </ul>
            </div>

            <div className="py-3 text-slate-600 px-2">
              <h2 className="font-bold">Product Name</h2>
              <div className="flex justify-start items-center gap-3">
                <span className="font-semibold">$123</span>
                <div className="flex">
                  <Ratings ratings={_.random(0, 5, true)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
