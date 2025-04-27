import React from "react";
import HeroCarousel from "../components/features/home/HeroCarousel";
import Categories from "../components/features/home/Categories";
import FeatureProduct from "../components/features/products/FeatureProduct";
import ProductStack from "../components/features/products/ProductStack";
import { useGetCategoriesQuery } from "../store/features/categoryApi";

const Home = () => {
  const {
    data: categories,
    isLoading: isGetLoading,
    // isError: isGetError,
    // isSuccess: isGetSuccess,
    // error: getError,
  } = useGetCategoriesQuery();

  return (
    <div className="w-full">
      <HeroCarousel />
      <Categories />
      <div className="py-[45px]">
        <FeatureProduct />
      </div>
      <div className="py-10">
        <div className="w-[85%] mx-auto grid size-full grid-cols-3 xl:grid-cols-2 md:grid-cols-1 gap-7">
          <div className="overflow-hidden">
            <ProductStack title="Latest Product" />
          </div>
          <div className="overflow-hidden">
            <ProductStack title="Top Rated Product" />
          </div>
          <div className="overflow-hidden">
            <ProductStack title="Discount Product" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
