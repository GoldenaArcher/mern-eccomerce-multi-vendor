import React from "react";

import SectionHeader from "../shared/SectionHeader";
import ProductGrid from "./ProductGrid";

const FeatureProduct = () => {
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <SectionHeader title="Feature Products" />
      <ProductGrid
        className={
          "grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
        }
      />
    </div>
  );
};

export default FeatureProduct;
