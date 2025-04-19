import React from "react";
import { createResponsiveConfig } from "../utils/responsive";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import SectionHeader from "./shared/SectionHeader";

const dummyCategories = [
  "All Categories",
  "Accessories",
  "Clothing",
  "Shoes",
  "Electronics",
  "Furniture",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Automotive",
];

const responsiveConfig = createResponsiveConfig({
  superLargeDesktop: 6,
  desktop: 6,
  tablet: 4,
  mobile: 2,
});

console.log(responsiveConfig);

const Categories = () => {
  return (
    <div className="w-[87%] mx-auto relative">
      <SectionHeader title="Categories" />
      <Carousel
        autoPlay
        infinite
        arrows
        transitionDuration={500}
        responsive={responsiveConfig}
        itemClass="px-1"
      >
        {dummyCategories.map((_, i) => (
          <Link to={"/demo"} key={i} className="h-[185px]">
            <div className="size-full relative p-3">
              <img
                src={`http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg`}
                alt="category-image"
                className="size-[185px] mx-auto"
              />
              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                <span className="bg-black/75 text-white px-4 py-1 rounded-md">
                  {dummyCategories[i]}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
