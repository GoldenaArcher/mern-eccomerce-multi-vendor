import React from "react";
import ProductCard from "./ProductCard";
import { cn } from "../../utils/cn";

const ProductGrid = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2 gap-3",
        className
      )}
    >
      {[1, 2, 3, 4, 5, 6].map((p, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
};

export default ProductGrid;
