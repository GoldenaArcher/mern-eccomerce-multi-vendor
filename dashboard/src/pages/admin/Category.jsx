import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaFileImage } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

import Table from "../../components/shared/Table";
import Pagination from "../../components/shared/Pagination";

const ordersColumnHeader = [
  { name: "No", accessor: "no" },
  { name: "Image", accessor: "image" },
  { name: "Name", accessor: "name" },
  { name: "Action", accessor: "action" },
];

// prettier-ignore
const dummyData = [
  { no: "1", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div>, },
  { no: "2", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div> },
  { no: "3", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div>,},
  { no: "4", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div> },
  { no: "5", image: <img src="http://localhost:3000/dummy" alt="category-img" className="w-[45px] h-[45px]" />, name: "shirts", action: <div className="flex justify-start items-center gap-4"> <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link> <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link></div> },
];

const Category = () => {
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
        <h1 className=" font-semibold text-lg">Category</h1>
        <button
          className="bg-red-500 shadow-lg hover:bg-red-500/40 px-4 py-2 cursor-pointer rounded-sm text-sm"
          onClick={() => setShow(true)}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
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

            <Table columns={ordersColumnHeader} data={dummyData} />

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={50}
              perPage={perPage}
              showItems={3}
            />
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed z-[40] top-0 transition-all duration-500 ${
            show ? "right-0" : "-right-[340px]"
          }`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl mb-4 w-full text-center mt-3">
                  Add Category
                </h1>
                <div className="block lg:hidden" onClick={() => setShow(false)}>
                  <IoIosCloseCircle />
                </div>
              </div>

              <form>
                <div className="flex flex-col w-full gap-1 mb-3 mt-3">
                  <label htmlFor="name" className="mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md mb-2"
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label
                    className="flex justify-center items-center flex-col h-[260px] cursor-pointer border border-dashed hover:border-indigo-300 w-full boder-[#d0d2d6]"
                    htmlFor="image"
                  >
                    <span className="block mb-3 mt-2">
                      <FaFileImage />
                    </span>
                    <span>Select Image</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="button"
                    value="Add Category"
                    className="bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 mt-2"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
