import React from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import Table from "../../components/shared/Table";
import StatGrid from "../../components/shared/StatGrid";
import { createCardData } from "../../utils/cardUtils";

// prettier-ignore
const cardData = createCardData([
  { title: '$1234', subtitle: "Total Sale", icon: "currency", color: 'red', },
  { title: '50', subtitle: "Products", icon: "products", color:'purple', },
  { title: '10', subtitle: "Sellers", icon: "users", color:'green', },
  { title: '54', subtitle: "Orders", icon: "cart", color:'blue', },
])

const adminDashboardColumnHeader = [
  { name: "Order Id", accessor: "orderId" },
  { name: "Price", accessor: "price" },
  { name: "Payment Status", accessor: "paymentStatus" },
  { name: "Order Status", accessor: "orderStatus" },
  { name: "Active", accessor: "active" },
];

const dummyData = [
  {
    orderId: "#1234",
    price: "$1234",
    paymentStatus: "pending",
    orderStatus: "pending",
    active: <Link>View</Link>,
  },
  {
    orderId: "#2345",
    price: "$2345",
    paymentStatus: "pending",
    orderStatus: "pending",
    active: <Link>View</Link>,
  },
  {
    orderId: "#3456",
    price: "$3456",
    paymentStatus: "pending",
    orderStatus: "pending",
    active: <Link>View</Link>,
  },
  {
    orderId: "#4567",
    price: "$4567",
    paymentStatus: "pending",
    orderStatus: "pending",
    active: <Link>View</Link>,
  },
  {
    orderId: "#5678",
    price: "$5678",
    paymentStatus: "pending",
    orderStatus: "pending",
    active: <Link>View</Link>,
  },
];

const AdminDashboard = () => {
  const state = {
    options: {
      dataLabels: {
        enabled: false,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2e6",
      },
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        // prettier-ignore
        categories: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            // prettier-ignore
            categories: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Orders",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Revenue",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Sellers",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <StatGrid>
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

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent Seller Message
              </h2>
              <Link className="font-semibold text-sm text-[#d0d2d6]">
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="dummy"
                      alt="admin profile"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-base font-normal">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How Are You
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="dummy"
                      alt="admin profile"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-base font-normal">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How Are You
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="dummy"
                      alt="admin profile"
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-base font-normal">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      How Are You
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link>
        </div>

        <Table
          columns={adminDashboardColumnHeader}
          data={dummyData}
          tableStyle="uppercase"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
