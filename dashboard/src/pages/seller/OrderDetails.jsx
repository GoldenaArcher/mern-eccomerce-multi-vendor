import React from "react";

const OrderDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl">Order Details</h2>
          <select
            name="order-status"
            id="order-status"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md"
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg">
            <h2>#1234</h2>
            <span>Mar 16 2025</span>
          </div>

          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To: Warehouse
                  </h2>
                  <p className="text-sm">
                    1035 N Maple St Saugatuck, Michigan(MI), 49453
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status</h2>
                  <p className="text-base">Paid</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Price</h2>
                  <p className="text-base">$234</p>
                </div>
                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="flex gap-3">
                    <div className="mr-2">
                      <img
                        src="http://localhost:3000/example.jpeg"
                        alt="product-image"
                        className="w-[55px] h-[55px]"
                      />
                    </div>
                    <div className="">
                      <h2>Product Name - Demo</h2>
                      <p>
                        <span>Brand: Demo Brand</span>
                      </p>
                      <p className="text-lg">
                        <span>Quantity: 3</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="flex gap-3">
                    <div className="mr-2">
                      <img
                        src="http://localhost:3000/example.jpeg"
                        alt="product-image"
                        className="w-[55px] h-[55px]"
                      />
                    </div>
                    <div className="">
                      <h2>Product Name - Demo</h2>
                      <p>
                        <span>Brand: Demo Brand</span>
                      </p>
                      <p className="text-lg">
                        <span>Quantity: 3</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md">
                  <div className="flex gap-3">
                    <div className="mr-2">
                      <img
                        src="http://localhost:3000/example.jpeg"
                        alt="product-image"
                        className="w-[55px] h-[55px]"
                      />
                    </div>
                    <div className="">
                      <h2>Product Name - Demo</h2>
                      <p>
                        <span>Brand: Demo Brand</span>
                      </p>
                      <p className="text-lg">
                        <span>Quantity: 3</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
