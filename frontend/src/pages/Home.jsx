import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FeatureProduct from "../components/products/FeatureProduct";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <div className="py-[45px]">
        <FeatureProduct />
      </div>
    </div>
  );
};

export default Home;
