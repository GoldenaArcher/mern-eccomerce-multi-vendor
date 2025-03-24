import React, { forwardRef } from "react";
import StatGrid from "../../components/shared/StatGrid";
import { FixedSizeList as List } from "react-window";
import { createCardData } from "../../utils/cardUtils";

// prettier-ignore
const cardData = createCardData([
  { title: "$12345", subtitle: "Total Sales", icon: "currency", color: "red" },
  { title: "$789", subtitle: "Available Amount", icon: "currency", color: "purple" },
  { title: "$124", subtitle: "Withdrawed Amount", icon: "currency", color: "green" },
  { title: "$567", subtitle: "Pending Amount", icon: "currency", color: "blue" },
]);

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
    </div>
  );
};

const Payments = () => {
  return (
    <div className="px-2 md:px-7 py-5 text-[#d0d2d6]">
      <StatGrid className="mb-5">
        {cardData.map(({ title, subtitle, icon, cardBg, iconBg }) => (
          <StatGrid.Card
            title={title}
            subtitle={subtitle}
            icon={icon}
            cardBg={cardBg}
            iconBg={iconBg}
            key={subtitle}
          />
        ))}
      </StatGrid>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
        <div className="bg-[#6a5fdf] rounded-md p-5">
          <h2 className="text-lg">Send Request</h2>
          <div className="mt-5">
            <form>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="number"
                  className="px-3 py-2 md:w-[75%] focus:border-indigo-300 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                  name="Value"
                  min={0}
                />
                <input
                  type="button"
                  value="Submit"
                  className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7"
                />
              </div>
            </form>
          </div>

          <div className="mt-5">
            <h2 className="text-lg pb-4">Pending Request</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#aea3de] uppercase text-xs font-bold min-w-[340px] rounded-md text-black">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>

              <List
                style={{ minWidth: "340px" }}
                className="List"
                height={350}
                itemCount={10}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            </div>
          </div>
        </div>

        <div className="bg-[#6a5fdf] rounded-md p-5">
          <h2 className="text-lg">Success Withdrawl</h2>

          <div className="mt-5">
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#aea3de] uppercase text-xs font-bold min-w-[340px] rounded-md text-black">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>

              <List
                style={{ minWidth: "340px" }}
                className="List"
                height={550}
                itemCount={15}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
