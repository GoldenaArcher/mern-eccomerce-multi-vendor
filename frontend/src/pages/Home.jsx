import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeatureProduct from "../components/products/FeatureProduct";
import ProductStack from "../components/products/ProductStack";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
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
