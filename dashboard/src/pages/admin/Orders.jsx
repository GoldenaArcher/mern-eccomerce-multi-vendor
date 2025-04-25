import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@mern/ui";

import Table from "../../components/shared/Table";
import Search from "../../components/shared/Search";

const ordersColumnHeader = [
  { width: "26%", name: "Order Id", accessor: "orderId" },
  { width: "14%", name: "Price", accessor: "price" },
  { width: "20%", name: "Payment Status", accessor: "paymentStatus" },
  { width: "20%", name: "Order Status", accessor: "orderStatus" },
  { width: "20%", name: "Action", accessor: "action" },
];

// prettier-ignore
const dummyData = [
  { orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending', action:  <Link to={`/admin/order/details/3`}>View</Link>, 
    subRows: [
      {orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending'},
      {orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending'},
      {orderId: "#1234", price: "$1234", paymentStatus: "pending", orderStatus: 'pending'},
    ]},
  { orderId: "#2345", price: "$2345", paymentStatus: "pending", orderStatus: 'pending', action:  <Link to={`/admin/order/details/3`}>View</Link> },
  { orderId: "#3456", price: "$3456", paymentStatus: "pending", orderStatus: 'pending', action:  <Link to={`/admin/order/details/3`}>View</Link>,
    subRows: [
      { orderId: "#3456", price: "$3456", paymentStatus: "pending", orderStatus: 'pending'},
    ]
   },
  { orderId: "#4567", price: "$4567", paymentStatus: "pending", orderStatus: 'pending', action:  <Link to={`/admin/order/details/3`}>View</Link> },
  { orderId: "#5678", price: "$5678", paymentStatus: "pending", orderStatus: 'pending', action:  <Link to={`/admin/order/details/3`}>View</Link> },
];

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          perPage={perPage}
          setPerPage={setPerPage}
        />

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
