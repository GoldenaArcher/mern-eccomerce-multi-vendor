import React, { useMemo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import _ from "lodash";

import { createResponsiveConfig } from "../../utils/responsive";
import SectionHeader from "../shared/SectionHeader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// dummy data
const products = [1, 2, 3, 4, 5, 6];

const ProductStack = ({ title, chunkNum = 3 }) => {
  const chunkedProducts = useMemo(
    () => _.chunk(products, chunkNum),
    [chunkNum]
  );

  const ButtonGroup = ({ next, previous }) => (
    <div className="flex justify-between items-center px-2">
      <SectionHeader
        title={title}
        className="text-2xl justify-start items-start pb-0"
        hideDivider
      />
      <div className="flex justify-center items-center gap-3 text-slate-600">
        <button
          onClick={previous}
          className="size-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          className="size-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col-reverse gap-8">
      <Carousel
        responsive={createResponsiveConfig()}
        transitionDuration={500}
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {chunkedProducts.map((group, pageIndex) => (
          <div key={pageIndex} className="flex flex-col gap-2 px-2">
            {group.map((_, i) => (
              <Link
                to={"/demo"}
                key={i}
                className="flex justify-start items-start"
              >
                <img
                  src={`http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg`}
                  alt="special-sell"
                  className="size-[110px]"
                />
                <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600">
                  <h2 className="font-semibold">Product Name</h2>
                  <span className="font-bold">$123</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductStack;
