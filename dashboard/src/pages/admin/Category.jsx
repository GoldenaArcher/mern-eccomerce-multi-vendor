import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaFileImage } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-hot-toast";

import Table from "../../components/shared/Table";
import Pagination from "../../components/shared/Pagination";
import Search from "../../components/shared/Search";
import FormInput from "../../components/shared/FormInput";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../store/features/categoryApi";
import { getBackendUrl } from "../../utils/envUtils";
import { usePaginationSearch } from "../../hooks/usePaginationSearch";
import { ButtonLoader, CenteredLoader } from "../../components/shared/loaders";

const categoriesColumnHeader = [
  { name: "No", accessor: "no" },
  { name: "Image", accessor: "image" },
  { name: "Name", accessor: "name" },
  { name: "Action", accessor: "action" },
];

const Category = () => {
  const {
    searchValue,
    setSearchValue,
    debouncedSearch,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
  } = usePaginationSearch();

  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const [displayedImg, setDisplayedImg] = useState("");

  useEffect(() => {
    return () => {
      if (displayedImg) {
        URL.revokeObjectURL(displayedImg);
      }
    };
  }, [displayedImg]);

  const {
    data: categories,
    isLoading: isGetLoading,
    // isError: isGetError,
    // isSuccess: isGetSuccess,
    // error: getError,
  } = useGetCategoriesQuery({
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
  });

  const [
    addCategory,
    {
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      isError: isAddError,
      error: addError,
    },
  ] = useAddCategoryMutation();

  useEffect(() => {
    if (isAddSuccess) {
      toast.success("Category added!");
      setState({ name: "", image: "" });
      setDisplayedImg("");
    }
  }, [isAddSuccess]);

  useEffect(() => {
    if (isAddError) {
      toast.error(addError?.data?.message);
    }
  }, [isAddError, addError?.data?.message]);

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

  const onAddCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("image", state.image);

    try {
      await addCategory(formData).unwrap();
    } catch (err) {
      console.error("Add Category failed: ", err);
    }
  };

  const tableData = useMemo(() => {
    if (!categories?.data) return [];

    return categories.data.map((cat, i) => ({
      key: cat.id,
      no: (currentPage - 1) * perPage + i + 1,
      image: (
        <img
          src={`${getBackendUrl()}${cat.image}`}
          alt={cat.slug}
          className="w-[45px] h-[45px]"
        />
      ),
      name: cat.name,
      action: (
        <div className="flex justify-start items-center gap-4">
          <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
            <FaEdit />
          </Link>
          <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
            <FaTrash />
          </Link>
        </div>
      ),
    }));
  }, [categories, currentPage, perPage]);

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

            {isGetLoading ? (
              <CenteredLoader />
            ) : (
              <Table columns={categoriesColumnHeader} data={tableData} />
            )}

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={categories?.pagination?.totalItems || 0}
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

              <form onSubmit={onAddCategory}>
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
                        className="size-full object-contain"
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
                    disabled={isAddLoading}
                  >
                    {isAddLoading ? <ButtonLoader /> : "Add Category"}
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
