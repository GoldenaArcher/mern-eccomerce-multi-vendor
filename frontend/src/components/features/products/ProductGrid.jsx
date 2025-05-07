import React from "react";
import ProductCard from "./ProductCard";
import { cn } from "@mern/utils";

const ProductGrid = ({ className, productList = [] }) => {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-3",
        className
      )}
    >
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
