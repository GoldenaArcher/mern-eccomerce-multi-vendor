import React from "react";
import PageBanner from "../components/shared/PageBanner";
import { Link, useNavigate } from "react-router-dom";
import QuantitySelector from "../components/shared/QuantitySelector";

const CartItem = () => (
  <div className="w-full flex flex-wrap mb-1">
    <div className="flex sm:w-full gap-2 w-7/12">
      <div className="flex gap-2 justify-start items-start">
        <img
          src="http://localhost:5000/uploads/toy_flash_sale_banner_compressed.jpg"
          alt="place holder"
          className="size-[80px] object-cover"
        />
        <div className="pr-4 text-slate-600">
          <h2 className="text-base font-semibold">Product Name</h2>
          <span className="text-sm">Brand: Demo</span>
        </div>
      </div>
    </div>

    <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
      <div className="pl-4 sm:pl-0">
        <h2 className="text-lg text-red-500">$233</h2>
        <p className="line-through">$300</p>
        <p>-15%</p>
      </div>

      <div className="flex gap-2 flex-col">
        <QuantitySelector />
        <button className="px-5 py-1 pt-[3px] bg-red-500 text-white rounded-md">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const Cart = () => {
  const navigate = useNavigate();

  const availableProducts = [1, 2, 3];
  const outOfStockProducts = [4, 5];

  const isEmpty =
    availableProducts.length === 0 && outOfStockProducts.length === 0;

  const onCheckoutClick = () => {
    navigate("/checkout", {
      state: {
        products: [1, 2, 3, 4, 5],
        productCost: 500,
        shippingFee: 20,
        totalCost: 520,
        couponCode: "",
      },
    });
  };

  return (
    <div>
      <PageBanner
        title={"Cart Page"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]}
      />
      <section className="bg-[#eeeeee] rounded-md">
        <div className="w-[85%] sm:w-[90%] md:w-[90%] lg:w-[85%] h-full mx-auto py-16">
          {isEmpty && (
            <div>
              <Link
                className="px-4 py-2 bg-[#059473] text-white rounded-md"
                to={"/shops"}
              >
                Explor Populor Stores
              </Link>
            </div>
          )}
          {!isEmpty && (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md=lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4 rounded-md">
                      <h2 className="text-base text-[#059473] font-semibold">
                        Stock Products {availableProducts.length}
                      </h2>
                    </div>
                    <div className="flex bg-white p-4 flex-col gap-2 rounded-md">
                      <div className="flex justify-start items-center">
                        <h2 className="text-slate-600 text-base font-bold">
                          Easy Shop
                        </h2>
                      </div>
                      <CartItem />
                      <CartItem />
                    </div>

                    <div className="flex bg-white p-4 flex-col gap-2 rounded-md">
                      <div className="flex justify-start items-center">
                        <h2 className="text-slate-600 text-base font-bold">
                          Easy Shop
                        </h2>
                      </div>
                      <CartItem />
                      <CartItem />
                    </div>

                    {outOfStockProducts.length > 0 && (
                      <>
                        <div className="bg-white p-4 rounded-md">
                          <h2 className="text-base text-red-600 font-semibold">
                            Out of Stock {outOfStockProducts.length}
                          </h2>
                        </div>
                        <div className="flex bg-white p-4 flex-col gap-2 rounded-md">
                          <div className="flex justify-start items-center">
                            <h2 className="text-slate-600 text-base font-bold">
                              Easy Shop
                            </h2>
                          </div>
                          <CartItem />
                          <CartItem />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {availableProducts.length > 0 && (
                    <div className="bg-white p-3 pb-4 text-slate-600 flex flex-col gap-3 rounded-md">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span>2 Items</span>
                        <span>$123</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee</span>
                        <span>$123</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="w-full p-2 border border-slate-300 rounded-md outline-none focus:border-[#059473]"
                          placeholder="Coupon Code"
                        />
                        <button className="px-5 py-2 bg-[#059473] text-white rounded-md">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span className="text-lg text-[#059473]">$345</span>
                      </div>

                      <button
                        className="px-5 py-2 rounded-md bg-[#059473] text-white uppercase transition-all duration-300 hover:shadow-[0_4px_10px_rgba(5,148,115,0.5)] w-full"
                        onClick={onCheckoutClick}
                      >
                        Process to Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
