import React, { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { Range } from "react-range";
import { FaThList } from "react-icons/fa";
import { cn } from "@mern/utils";

import Ratings from "../components/shared/Ratings";
import ProductStack from "../components/features/products/ProductStack";
import ProductGrid from "../components/features/products/ProductGrid";
import ProductList from "../components/features/products/ProductList";
import { usePagination } from "@mern/hooks";
import Pagination from "../components/shared/Pagination";
import PageBanner from "../components/shared/PageBanner";

const dummyCategories = [
  "All Categories",
  "Accessories",
  "Clothing",
  "Shoes",
  "Electronics",
  "Furniture",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Automotive",
];

const viewModes = ["grid", "list"];

const Shops = () => {
  const [filter, setFilter] = useState(true);
  const [state, setState] = useState({ values: [10, 2000] });
  const [selectedRating, setSelectedRating] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const { currentPage, setCurrentPage, perPage } = usePagination();

  return (
    <div>
      <PageBanner
        title={"Shop Page"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <section className="py-16">
        <div className="w-[85%] sm:w-[90%] md:w-[90%] lg:w-[85%] h-full mx-auto">
          <div
            className={cn(
              "md:block hidden transition-all duration-300",
              filter && "pb-6"
            )}
          >
            <button
              className="text-center w-full py-2 px-3 bg-[#059473] text-white"
              onClick={() => setFilter((prev) => !prev)}
            >
              Product Filter
            </button>
          </div>

          <div className="w-full flex flex-wrap">
            <div
              className={cn(
                "w-3/12 md-lg:w-4/12 md:w-full pr-8 transition-all duration-300",
                {
                  "md:max-h-[980px] mb-0 md:opacity-100 md:pb-6": filter,
                  "md:max-h-0 mb-6 md:opacity-0 md:pb-0": !filter,
                }
              )}
            >
              <div className="">
                <h2 className="text-3xl font-bold text-slate-600 mb-3">
                  Category
                </h2>
                <div className="py-2">
                  {dummyCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center gap-2 py-1"
                    >
                      <input type="checkbox" className="ml-2 text-slate-600" />
                      <label className="text-sm font-semibold text-slate-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-2 flex flex-col gap-5">
                <h2 className="text-3xl font-bold text-slate-600 mb-3">
                  Price
                </h2>
                <div className="px-4">
                  <Range
                    step={5}
                    min={10}
                    max={2000}
                    values={state.values}
                    onChange={(values) => {
                      setState((prev) => ({ ...prev, values }));
                    }}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, isDragged, isActive }) => (
                      <div
                        {...props}
                        className={cn(
                          "size-[15px] bg-[#059473] rounded-full cursor-pointer",
                          {
                            "transform scale-110": isDragged,
                            "transform scale-125": isActive,
                          }
                        )}
                      />
                    )}
                  />
                </div>
                <span className="text-slate-600 font-bold text-lg px-4">
                  ${Math.floor(state.values[0])} - $
                  {Math.floor(state.values[1])}
                </span>
              </div>

              <div className="py-3 flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-slate-600 mt-1 mb-3">
                  Rating
                </h2>
                <ul className="px-3 flex flex-col gap-4">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <li key={num}>
                      <Ratings
                        ratings={num}
                        className="gap-3"
                        onClick={() => {
                          setSelectedRating(num);
                        }}
                        size="lg"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-5 flex flex-col gap-4 md:hidden">
                <ProductStack title="Latest Product" />
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 px-3 bg-white mb-10 rounded-md flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600">
                    14 Products
                  </h2>
                  <div className="flex justify-center items-center gap-3">
                    <select
                      name=""
                      id=""
                      className="p-1 border outline-none text-slate-600 font-semibold"
                    >
                      <option value="">Sort</option>
                      <option value="price-asc">Lowest Price</option>
                      <option value="price-desc">Hightest Price</option>
                    </select>

                    <div className="flex justify-center items-center gap-4 md-lg:hidden">
                      {viewModes.map((mode) => (
                        <div
                          key={mode}
                          className={cn(
                            "p-2 text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm",
                            {
                              "bg-slate-300": viewMode === mode,
                            }
                          )}
                          onClick={() => {
                            setViewMode(mode);
                          }}
                        >
                          {mode === "grid" && <BsFillGridFill />}
                          {mode === "list" && <FaThList />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pb-8">
                  {viewMode === "grid" && <ProductGrid />}
                  {viewMode === "list" && <ProductList />}
                </div>

                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalItems={50}
                  perPage={perPage}
                  showItems={3}
                  className={"justify-center"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shops;
