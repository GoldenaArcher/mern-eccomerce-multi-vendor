import React, { useState } from "react";
import PageBanner from "../components/shared/PageBanner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import _ from "lodash";

import { createResponsiveConfig } from "../utils/responsive";
import Ratings from "../components/shared/Ratings";
import QuantitySelector from "../components/shared/QuantitySelector";
import {
  FaFacebookF,
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { cn } from "../utils/cn";

let discount = 10;
let stock = 10;

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
          <div className="grid grid-cols-[40%_60%] md-lg:grid-cols-1 gap-8">
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
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Ratings ratings={_.random(0, 5, true)} />
                </div>
                <span className="text-[#059473]">(24 Reviews)</span>
              </div>

              <div className="text-2xl text-red-500 font-bold flex gap-3">
                {discount > 0 ? (
                  <>
                    <h2 className="line-through">$500</h2>
                    <h2 className="">
                      ${Math.floor((500 * (100 - discount)) / 100)} (-{discount}
                      %)
                    </h2>
                  </>
                ) : (
                  <h2 className="">$200</h2>
                )}
              </div>

              <div className="text-slate-600">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
                  vitae aperiam illum beatae voluptas, quia laudantium optio
                  voluptatum iure perferendis non delectus ex atque commodi
                  tenetur. Doloremque totam facilis excepturi.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  ratione excepturi voluptas debitis nisi similique tempore
                  natus placeat nam maxime earum dolore quod, possimus aliquam!
                  Quo labore eveniet veritatis officia!
                </p>
              </div>

              <div className="flex gap-3 pb-10 border-b">
                <QuantitySelector className={"h-[50px]"} />
                <button className="px-8 py-3 h-[50px] hover:shadow-lg hover:shadow-green-600/50 bg-[#059473] text-white rounded-md cursor-pointer">
                  Add To Cart
                </button>
                <div className="size-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-600/50 bg-cyan-600 text-white rounded-md group">
                  <FaHeart className="group-hover:scale-150 duration-300 transition-all " />
                </div>
              </div>

              <div className="grid grid-cols-[20%_80%] py-5 gap-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Availability</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span
                    className={cn({
                      "text-green-600": stock > 0,
                      "text-red-500": stock === 0,
                    })}
                  >
                    {stock > 0 ? "In Stock(10)" : "Out of Stock"}
                  </span>
                </div>
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Share</span>
                </div>
                <div className="">
                  <ul className="flex justify-start items-center gap-4 text-black">
                    <li>
                      <button type="button" aria-label="Facebook">
                        <FaFacebookF />
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Facebook">
                        <FaTwitter />
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Facebook">
                        <FaLinkedin />
                      </button>
                    </li>
                    <li>
                      <button type="button" aria-label="Facebook">
                        <FaYoutube />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-8 py-3 h-[50px] hover:shadow-lg hover:shadow-green-600/50 bg-[#059473] text-white rounded-md cursor-pointer">
                  Buy Now
                </button>
                <button className="px-8 py-3 h-[50px] hover:shadow-lg hover:shadow-blue-500/50 bg-blue-500  text-white rounded-md cursor-pointer">
                  Chat Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
