import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { createResponsiveConfig } from "../utils/responsive";

const Banner = () => {
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="my-8">
              <Carousel
                autoPlay
                infinite
                arrows
                showDots
                responsive={createResponsiveConfig()}
              >
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <Link to={"/demo"} key={i}>
                    <img
                      src={`http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg`}
                      alt="special-sell"
                    />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
