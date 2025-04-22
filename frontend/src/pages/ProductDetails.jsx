import React, { useState } from "react";
import PageBanner from "../components/shared/PageBanner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { createResponsiveConfig } from "../utils/responsive";

const ProductDetails = () => {
  const [selectedImg, setSelectedImg] = useState(
    "http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg"
  );

  return (
    <div>
      <PageBanner
        title={"Product Name"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Category name", href: "/categories" },
          { label: "Product Name" },
        ]}
      />

      <section className="mt-5">
        <div className="w-[85%] sm:w-[90%] md:w-[90%] lg:w-[85%] h-full mx-auto">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div className="">
              <div className="p-5 border">
                <img
                  src={selectedImg}
                  alt="product-image"
                  className="size-full h-[400px] object-cover"
                />
              </div>
              <div className="py-3">
                <Carousel
                  infinite
                  arrows
                  responsive={createResponsiveConfig({
                    superLargeDesktop: 5,
                    desktop: 5,
                    tablet: 4,
                    mobile: 3,
                  })}
                >
                  {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i % 2 === 0
                          ? `http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg`
                          : `http://localhost:5000/uploads/outdoor_flash_sale_banner_compressed.jpg`
                      }
                      alt="special-sell"
                      className="h-[120px] object-cover cursor-pointer p-1"
                      onClick={() => {
                        setSelectedImg(
                          i % 2 === 0
                            ? `http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg`
                            : `http://localhost:5000/uploads/outdoor_flash_sale_banner_compressed.jpg`
                        );
                      }}
                    />
                  ))}
                </Carousel>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="text-3xl text-slate-600 font-bold">
                Product Name
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
