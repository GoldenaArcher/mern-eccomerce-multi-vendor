import React from "react";
import HeroCarousel from "../components/features/home/HeroCarousel";
import Categories from "../components/features/home/Categories";
import FeatureProduct from "../components/features/products/FeatureProduct";
import ProductStack from "../components/features/products/ProductStack";
import { useGetPartitionedFeaturedProductsQuery } from "../store/features/featuredProductApi";

const Home = () => {
  const { data: partitionedFeaturedProducts } =
    useGetPartitionedFeaturedProductsQuery({
      types: ["latest", "topRated", "discount", "featured"],
    });

  return (
    <div className="w-full">
      <HeroCarousel />
      <Categories />
      <div className="py-[45px]">
        <FeatureProduct
          featureProductList={partitionedFeaturedProducts?.data?.featured}
        />
      </div>
      <div className="py-10">
        <div className="w-[85%] mx-auto grid size-full grid-cols-3 xl:grid-cols-2 md:grid-cols-1 gap-7">
          <div className="overflow-hidden">
            <ProductStack
              title="Latest Product"
              productList={partitionedFeaturedProducts?.data?.latest}
            />
          </div>
          <div className="overflow-hidden">
            <ProductStack
              title="Top Rated Product"
              productList={partitionedFeaturedProducts?.data?.topRated}
            />
          </div>
          <div className="overflow-hidden">
            <ProductStack
              title="Discount Product"
              productList={partitionedFeaturedProducts?.data?.discount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
