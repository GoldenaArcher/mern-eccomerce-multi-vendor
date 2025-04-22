import React, { useState } from "react";
import PageBanner from "../components/shared/PageBanner";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const orderSummary = location.state || {};

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const onChangeAddress = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <PageBanner
        title={"Checkout Page"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] sm:w-[90%] md:w-[90%] lg:w-[85%] h-full mx-auto py-16">
          <div className="w-full flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3 text-xl">
                    Shipping Information
                  </h2>
                  <form>
                    <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-3 text-slate-600">
                      {/* First Name */}
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.firstName}
                        />
                      </div>

                      {/* Last Name */}
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.lastName}
                        />
                      </div>

                      {/* Address */}
                      <div className="flex flex-col gap-1 w-full md-lg:col-span-2">
                        <label htmlFor="address">Street Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="1234 Main St"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.address}
                        />
                      </div>

                      {/* Apartment */}
                      <div className="flex flex-col gap-1 w-full md-lg:col-span-2">
                        <label htmlFor="address2">Apartment / Suite</label>
                        <input
                          type="text"
                          id="address2"
                          name="address2"
                          placeholder="Apt, Suite, Unit (Optional)"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.address2}
                        />
                      </div>

                      {/* City */}
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          placeholder="City"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.city}
                        />
                      </div>

                      {/* State */}
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="state">State / Province</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="State / Province"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.state}
                        />
                      </div>

                      {/* Zip */}
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="zip">ZIP / Postal Code</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="ZIP / Postal Code"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.zip}
                        />
                      </div>

                      {/* Country */}
                      <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          placeholder="Country"
                          className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:border-[#059473]"
                          onChange={onChangeAddress}
                          value={shippingAddress.country}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-white p-3 pb-4 text-slate-600 flex flex-col gap-3 rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3 text-xl">
                    Order Summary
                  </h2>
                  <div className="flex justify-between items-center">
                    <span>{orderSummary.products.length} Items</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{orderSummary.total} Items Cost</span>
                    <span>${orderSummary.productCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping Fee</span>
                    <span>${orderSummary.shippingFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-lg text-[#059473]">
                      ${orderSummary.totalCost}
                    </span>
                  </div>

                  <button className="px-5 py-2 rounded-md bg-[#059473] text-white uppercase transition-all duration-300 hover:shadow-[0_4px_10px_rgba(5,148,115,0.5)] w-full">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
