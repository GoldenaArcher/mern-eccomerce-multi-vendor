import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Row = ({ index, style }) => {
  return (
    <div className="flex text-sm font-medium" style={style} key={index}>
      <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
      <div className="w-[25%] p-2 whitespace-nowrap">$1234</div>
      <div className="w-[25%] p-2 whitespace-nowrap">
        <span className="py-[1px] px-[5px] bg-blue-500 text-slate-300 rounded-md text-sm">
          Pending
        </span>
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap">2025-03-16</div>
      <div className="w-[25%] p-2 whitespace-nowrap">
        <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">
          Confirm
        </button>
      </div>
    </div>
  );
};

const PaymentRequests = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
        <h2 className="text-xl font-medium pb-5 ">Withdraw Requests</h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#aea3de] uppercase text-xs font-bold min-w-[340px] rounded-md text-black">
              <div className="w-[25%] p-2">No</div>
              <div className="w-[25%] p-2">Amount</div>
              <div className="w-[25%] p-2">Status</div>
              <div className="w-[25%] p-2">Date</div>
              <div className="w-[25%] p-2">Action</div>
            </div>

            <List
              style={{ minWidth: "340px" }}
              className="List"
              height={550}
              itemCount={1000}
              itemSize={37}
              outerElementType={outerElementType}
            >
              {Row}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequests;
