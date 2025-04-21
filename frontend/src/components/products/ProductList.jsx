import React from "react";
import _ from "lodash";
import Ratings from "../shared/Ratings";
import { FaShoppingCart } from "react-icons/fa";

const ProductListItem = () => {
  return (
    <div className="flex w-full bg-white rounded-md p-4 gap-6 md-lg:flex-col md-lg:items-start shadow hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="w-[160px] h-[160px] shrink-0 overflow-hidden rounded-md">
        <img
          src={
            "http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg"
          }
          alt={"product name"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-800">New Product</h3>
          <p className="text-slate-600 text-sm mt-1 line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            atque culpa autem veritatis nihil sed eos quas cum blanditiis ea!
            Doloremque excepturi fugit quis quas a eum saepe rem labore.
          </p>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-2 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-[#059473]">$12345</span>
            <Ratings ratings={_.random(0, 5, true)} />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#059473] text-white hover:bg-[#06b48d] transition-all">
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-3">
      {[1, 2, 3, 4, 5, 6].map((p, i) => (
        <div
          key={i}
          className="flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start w-full gap-4 bg-white p-1 rounded-md"
        >
          <ProductListItem key={i} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
