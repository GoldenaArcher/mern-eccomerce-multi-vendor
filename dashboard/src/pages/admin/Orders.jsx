import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/shared/Table";
import Pagination from "../../components/shared/Pagination";

const ordersColumnHeader = [
  { width: "26%", name: "Order Id", accessor: "orderId" },
  { width: "14%", name: "Price", accessor: "price" },
  { width: "20%", name: "Payment Status", accessor: "paymentStatus" },
  { width: "20%", name: "Order Status", accessor: "orderStatus" },
  { width: "20%", name: "Action", accessor: "action" },
];

// prettier-ignore
const dummyData = [
  { orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending', action:  <Link>View</Link>, 
    subRows: [
      {orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending'},
      {orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending'},
      {orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending'},
    ]},
  { orderId: "#2345", price: "$2345", paymentStatus: "pending", orderStatus: 'pending', action:  <Link>View</Link> },
  { orderId: "#3456", price: "$3456", paymentStatus: "pending", orderStatus: 'pending', action:  <Link>View</Link>,
    subRows: [
      { orderId: "#3456", price: "$3456", paymentStatus: "pending", orderStatus: 'pending'},
    ]
   },
  { orderId: "#4567", price: "$4567", paymentStatus: "pending", orderStatus: 'pending', action:  <Link>View</Link> },
  { orderId: "#5678", price: "$5678", paymentStatus: "pending", orderStatus: 'pending', action:  <Link>View</Link> },
];

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center">
          <select
            name="perPage"
            id="perPage"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            onChange={(e) => {
              setPerPage(parseInt(e.target.value));
            }}
            value={perPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            type="text"
            placeholder="search"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>

        <Table
          columns={ordersColumnHeader}
          tableStyle="mt-5"
          data={dummyData}
          isExpandable
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={50}
          perPage={perPage}
          showItems={3}
        />
      </div>
    </div>
  );
};

export default Orders;
