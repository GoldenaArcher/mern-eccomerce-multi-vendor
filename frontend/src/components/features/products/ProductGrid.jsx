import React from "react";
import ProductCard from "./ProductCard";
import { cn } from "@mern/utils";

const ProductGrid = ({ className, productList }) => {
  console.log(productList);

  return (
    <div
      className={cn(
        "w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2 gap-3",
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
