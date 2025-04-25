import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { usePaginationSearch } from "@mern/hooks";
import { Pagination } from "@mern/ui";

import Table from "../../components/shared/Table";
import Search from "../../components/shared/Search";
import { useGetSellersQuery } from "../../store/features/sellerApi";

const sellersColumnHeader = [
  { name: "No", accessor: "no" },
  { name: "Image", accessor: "image" },
  { name: "Name", accessor: "name" },
  { name: "Shop Name", accessor: "shopName" },
  { name: "Payment Status", accessor: "paymentStatus" },
  { name: "Email", accessor: "email" },
  { name: "Country", accessor: "country" },
  { name: "State", accessor: "state" },
  { name: "City", accessor: "city" },
  { name: "Action", accessor: "action" },
];

// prettier-ignore
const dummyData = [
    { no: "1", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link></div> ,},
    { no: "2", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link></div> ,},
    { no: "3", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link></div> ,},
    { no: "4", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link></div> ,},
    { no: "5", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start"><Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link></div> ,},
  ];

const Sellers = () => {
  const {
    searchValue,
    setSearchValue,
    debouncedSearch,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
  } = usePaginationSearch();

  useGetSellersQuery({
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
  });

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Sellers</h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          perPage={perPage}
          setPerPage={setPerPage}
        />

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

export default Sellers;
