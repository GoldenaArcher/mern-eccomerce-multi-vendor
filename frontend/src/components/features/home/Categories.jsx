import React from "react";
import { createResponsiveConfig } from "../../../utils/responsive";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import SectionHeader from "../../shared/SectionHeader";
import { useGetCategoriesQuery } from "../../../store/features/categoryApi";
import { getBackendUrl } from "../../../utils/envUtils";

const responsiveConfig = createResponsiveConfig({
  superLargeDesktop: 6,
  desktop: 6,
  tablet: 4,
  mobile: 2,
});

const Categories = () => {
  const { data: categories } = useGetCategoriesQuery();

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
        {categories?.data?.map(({ name, id, image }) => (
          <Link to={"/demo"} key={id} className="h-[185px]">
            <div className="size-full relative p-3">
              <img
                src={`${getBackendUrl()}${image}`}
                alt="category-image"
                className="size-[185px] mx-auto"
              />
              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center">
                <span className="bg-black/75 text-white px-4 py-1 rounded-md">
                  {name}
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
