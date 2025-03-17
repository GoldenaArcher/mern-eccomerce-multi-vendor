import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosImage } from "react-icons/io";

const categories = [
  { id: 1, name: "Sports" },
  { id: 2, name: "T-shirts" },
  { id: 3, name: "Mobile" },
  { id: 4, name: "Computer" },
  { id: 5, name: "Watch" },
  { id: 6, name: "Pants" },
];

const AddProduct = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
    category: "",
    images: [],
  });

  const [showCategory, setShowCategory] = useState(false);
  const [allCategories, setAllCategories] = useState(categories);
  const [searchValue, setSearchValue] = useState("");

  const onProductChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onCategorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      setAllCategories(() => {
        return categories.filter(
          (category) =>
            category.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
      });
    } else {
      setAllCategories(categories);
    }
  };

  const onImageUpload = (e) => {
    const files = e.target.files,
      length = files.length;

    if (length > 0) {
      setState((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    } else {
    }
  };

  return (
    <div className="px-2 lg:px-7 pt-5 text-[#d0d2d6]">
      <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-xl font-semibold">Add Product</h1>
          <Link className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2">
            All Products
          </Link>
        </div>

        <div className="">
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Name"
                  onChange={onProductChange}
                  value={state.name}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product Brand</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Product Brand"
                  onChange={onProductChange}
                  value={state.brand}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => {
                    setShowCategory((prev) => !prev);
                  }}
                  type="text"
                  name="categoty"
                  id="category"
                  placeholder="-- Select Category --"
                  onChange={onProductChange}
                  value={state.category}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md"
                />
                <div
                  className={`absolute top-[100%] bg-[#475569] w-full transition-all ${
                    showCategory ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-3 py-1 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md overflow-hidden"
                      onChange={onCategorySearch}
                      value={searchValue}
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {allCategories.map((category) => {
                      return (
                        <div
                          key={category.id}
                          onClick={() => {
                            setShowCategory((prev) => !prev);
                            setState((prev) => ({
                              ...prev,
                              category: category.name,
                            }));
                            setSearchValue("");
                            setAllCategories(categories);
                          }}
                          className={`w-full cursor-pointer px-4 py-2 hover:bg-indigo-300 hover:text-[#475569] hover:shadow-lg ${
                            state.category === category.name
                              ? "bg-indigo-400 text-[#475569]"
                              : ""
                          }`}
                        >
                          {category.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Product Stock</label>
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="Product Stock"
                  onChange={onProductChange}
                  value={state.stock}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="price"
                  onChange={onProductChange}
                  value={state.price}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount by %"
                  onChange={onProductChange}
                  value={state.discount}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full mb-5">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  onChange={onProductChange}
                  value={state.description}
                  placeholder="Description"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md resize-none"
                  cols={10}
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full mb-4">
              <label
                htmlFor="image"
                className="flex justify-center items-center h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full"
              >
                <p className="flex justify-center items-center flex-col w-full">
                  <span>
                    <IoIosImage />
                  </span>
                  <span>Select Image</span>
                </p>
              </label>
              <input
                type="file"
                id="image"
                multiple
                className="hidden"
                onChange={onImageUpload}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
