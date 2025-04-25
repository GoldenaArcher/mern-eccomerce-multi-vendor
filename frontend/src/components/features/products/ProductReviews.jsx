import React, { useState } from "react";
import _ from "lodash";
import ReactRating from "react-rating";

import Ratings from "../../shared/Ratings";
import Pagination from "../../shared/Pagination";
import { usePagination } from "@mern/hooks";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const ProductReviews = () => {
  const { currentPage, setCurrentPage, perPage } = usePagination();
  const [userReview, setUserReview] = useState({
    rating: 0,
    review: "",
  });
  const userInfo = { a: "a" };

  return (
    <main className="mt-8">
      <section className="grid lg:grid-cols-1 grid-cols-[minmax(0,_300px)_1fr] gap-8">
        <div className="flex flex-col gap-4 items-start">
          <div className="text-6xl font-semibold">
            4.5 <span className="text-3xl text-slate-600">/5</span>
          </div>
          <Ratings ratings={4.5} size="3xl" bright />
          <p className="text-sm text-slate-600">15 reviews</p>
        </div>

        <ul className="grid gap-y-4">
          {[5, 4, 3, 2, 1].map((num) => (
            <li
              key={num}
              className="grid grid-cols-[minmax(80px,_20%)_1fr_auto] items-center gap-3"
            >
              <Ratings ratings={num} size="2xl" />
              <div className="w-full h-[14px] bg-slate-200 relative rounded overflow-hidden">
                <div
                  className="h-full bg-[#EDBB0E]"
                  style={{ width: `${_.random(0, 100, false)}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-600">10</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-5">
        <h2 className="text-slate-600 text-xl font-black">
          Product Reviews (10)
        </h2>
        <ul className="flex flex-col gap-8 pb-10 pt-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <Ratings
                  ratings={4.5}
                  className="text-xl sm:text-sm md:text-base"
                />
                <span className="text-slate-600">8 Apr 2025</span>
              </div>
              <span className="text-slate-600">Demo User</span>
              <p className="text-slate-600 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestias, obcaecati dolor? Beatae neque nam inventore sint
                dignissimos libero voluptatem corporis atque fuga pariatur
                commodi quam temporibus, iste obcaecati perspiciatis modi.
              </p>
            </div>
          ))}
        </ul>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={50}
          perPage={perPage}
          showItems={3}
          className={"justify-center"}
        />

        <div className="flex mt-10 min-h-[300px] w-full">
          {!_.isEmpty(userInfo) ? (
            <div className="flex flex-col gap-3">
              <ReactRating
                onChange={(rating) => {
                  setUserReview((prev) => ({ ...prev, rating }));
                }}
                initialRating={userReview.rating}
                emptySymbol={<CiStar className="text-slate-600 text-4xl" />}
                fullSymbol={<FaStar className="text-[#EDBB0E] text-4xl" />}
              />
              <form>
                <textarea
                  draggable="false"
                  className="select-none resize-none outline-none border w-[60vw] md-lg:w-[85vw] h-[150px] p-2 focus:outline-none rounded-md"
                  name=""
                  id=""
                  required
                ></textarea>
                <button
                  type="submit"
                  className="mt-5 py-2 px-5 bg-[#059473] w-[200px] md-lg:w-[85vw] text-white rounded-md mx-auto block"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Link to={"/login"}>
                <button className="bg-[#059473] py-2 px-5 text-white rounded-md">
                  Please Login First
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductReviews;
