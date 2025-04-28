import React, { useMemo } from "react";

import SectionHeader from "../../shared/SectionHeader";
import ProductGrid from "./ProductGrid";

const FeatureProduct = ({ featureProductList = [] }) => {
  const processedProductList = useMemo(
    () =>
      featureProductList.map((featuredProduct) => ({
        ...featuredProduct,
        ...featuredProduct.product,
      })),
    [featureProductList]
  );

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <SectionHeader title="Feature Products" />
      <ProductGrid
        className={
          "grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
        }
        productList={processedProductList}
      />
    </div>
  );
};

export default FeatureProduct;
