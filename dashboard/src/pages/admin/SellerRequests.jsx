import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import Table from "../../components/shared/Table";
import Pagination from "../../components/shared/Pagination";

const sellersColumnHeader = [
  { name: "No", accessor: "no" },
  { name: "Name", accessor: "name" },
  { name: "Email", accessor: "email" },
  { name: "Payment Status", accessor: "paymentStatus" },
  { name: "Email", accessor: "email" },
  { name: "Status", accessor: "status" },
  { name: "Action", accessor: "action" },
];

// prettier-ignore
const dummyData = [
    { no: "1", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50' to={'/admin/seller/details/2'}><FaEye /></Link></div> ,},
    { no: "2", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50' to={'/admin/seller/details/2'}><FaEye /></Link></div> ,},
    { no: "3", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50' to={'/admin/seller/details/2'}><FaEye /></Link></div> ,},
    { no: "4", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50' to={'/admin/seller/details/2'}><FaEye /></Link></div> ,},
    { no: "5", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50' to={'/admin/seller/details/2'}><FaEye /></Link></div> ,},
  ];

const SellerRequests = () => {
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Requests</h1>

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

        <Table columns={sellersColumnHeader} data={dummyData} />

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

export default SellerRequests;
