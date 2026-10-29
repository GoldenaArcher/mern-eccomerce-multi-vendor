import React from "react";
import ProductCard from "./ProductCard";
import { cn } from "@mern/utils";

const ProductGrid = ({ className, productList = [], showIcons = true }) => {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-3",
        className
      )}
    >
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} showIcons={showIcons} />
      ))}
    </div>
  );
};

export default ProductGrid;
