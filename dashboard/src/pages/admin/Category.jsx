import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaFileImage } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { PropagateLoader } from "react-spinners";

import Table from "../../components/shared/Table";
import Pagination from "../../components/shared/Pagination";
import Search from "../../components/shared/Search";
import FormInput from "../../components/shared/FormInput";
import { overrideStyle } from "../../utils/styleUtil";

const categoriesColumnHeader = [
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
  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const [displayedImg, setDisplayedImg] = useState("");

  const isLoading = false;

  const onImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setDisplayedImg(URL.createObjectURL(files[0]));
    }
    setState((prev) => ({
      ...prev,
      image: files[0],
    }));
  };

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
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              perPage={perPage}
              setPerPage={setPerPage}
            />

            <Table columns={categoriesColumnHeader} data={dummyData} />

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
                <FormInput
                  label="Category Name"
                  type="text"
                  name="category_name"
                  placeholder="Category Name"
                  value={state.name}
                  setState={setState}
                  onChange={(e) => {
                    setState({
                      ...state,
                      name: e.target.value,
                    });
                  }}
                />
                <div className="mb-3 mt-3">
                  <label
                    className="flex justify-center items-center flex-col h-[260px] cursor-pointer border border-dashed hover:border-indigo-300 w-full boder-[#d0d2d6]"
                    htmlFor="image"
                  >
                    {displayedImg ? (
                      <img
                        src={displayedImg}
                        alt="category-img"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <span className="block mb-3 mt-2">
                          <FaFileImage />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    onChange={onImageUpload}
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <PropagateLoader
                        cssOverride={overrideStyle}
                        color="#fff"
                      />
                    ) : (
                      "Add Category"
                    )}
                  </button>
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
