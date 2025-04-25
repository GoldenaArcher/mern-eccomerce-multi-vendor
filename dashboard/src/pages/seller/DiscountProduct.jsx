import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pagination } from "@mern/ui";

import Search from "../../components/shared/Search";
import Table from "../../components/shared/Table";

const productsDiscountsColumnHeader = [
  { name: "No", accessor: "no" },
  { name: "Image", accessor: "image" },
  { name: "Name", accessor: "name" },
  { name: "Category", accessor: "category" },
  { name: "Brand", accessor: "brand" },
  { name: "Price", accessor: "price" },
  { name: "Discount", accessor: "discount" },
  { name: "Stock", accessor: "stock" },
  { name: "Action", accessor: "action" },
];

// prettier-ignore
const dummyData = [
    { no: "1", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>  <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div>, },
    { no: "2", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div> },
    { no: "3", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div>,},
    { no: "4", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div> },
    { no: "5", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div> },
  ];

const DiscountProduct = () => {
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className=" font-semibold text-lg">All Products</h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          perPage={perPage}
          setPerPage={setPerPage}
        />

        <Table columns={productsDiscountsColumnHeader} data={dummyData} />

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

export default DiscountProduct;
