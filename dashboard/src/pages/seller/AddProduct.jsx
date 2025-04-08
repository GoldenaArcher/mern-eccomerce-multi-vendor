import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosImage, IoIosCloseCircle } from "react-icons/io";
import _ from "lodash";
import { PropagateLoader, PuffLoader } from "react-spinners";
import toast from "react-hot-toast";

import FormInput from "../../components/shared/FormInput";
import { useGetCategoriesQuery } from "../../store/features/categoryApi";
import { useAddProductMutation } from "../../store/features/productApi";
import { overrideStyle } from "../../utils/styleUtil";
import { usePaginationSearch } from "../../hooks/usePaginationSearch";

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

  const { searchValue, setSearchValue, debouncedSearch, cancelDebounce } =
    usePaginationSearch();

  const [showCategory, setShowCategory] = useState(false);
  const [displayedImg, setDisplayedImg] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const categoryQueryArgs = useMemo(
    () => ({
      search: debouncedSearch,
      all: true,
    }),
    [debouncedSearch]
  );

  const {
    data: allCategories,
    isLoading: isGetCategoriesLoading,
    // isError: isGetError,
    // isSuccess: isGetSuccess,
    // error: getError,
  } = useGetCategoriesQuery(categoryQueryArgs);

  const [
    addProduct,
    {
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      isError: isAddError,
      error: addError,
    },
  ] = useAddProductMutation();

  useEffect(() => {
    if (isAddSuccess) {
      toast.success("Product added!");
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
        category: "",
        images: [],
      });
      setDisplayedImg([]);
      setCategoryName("");
    }
  }, [isAddSuccess]);

  useEffect(() => {
    if (isAddError) {
      toast.error(addError?.data?.message);
    }
  }, [isAddError, addError]);

  useEffect(() => {
    return () => {
      if (_.isEmpty(displayedImg)) return;

      _.forEach(displayedImg, (img) => {
        URL.revokeObjectURL(img.url);
      });
    };
  }, [displayedImg]);

  const onProductChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onImageUpload = (e) => {
    const files = e.target.files;

    if (_.isEmpty(files)) return;

    setState((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    const imgUrl = _.map(files, (file) => ({
      url: URL.createObjectURL(file),
    }));
    setDisplayedImg((prev) => [...prev, ...imgUrl]);
  };

  const onImageReplace = (img, index) => {
    if (!img) return;

    setState((prev) => {
      if (index >= prev.images.length) return prev;

      const newImgs = [...prev.images];
      newImgs[index] = img;
      return {
        ...prev,
        images: newImgs,
      };
    });

    setDisplayedImg((prev) => {
      if (index >= prev.length) return prev;

      URL.revokeObjectURL(prev[index].url);

      const newImgs = [...prev];
      newImgs[index] = {
        url: URL.createObjectURL(img),
      };

      return newImgs;
    });
  };

  const onImageRemove = (i) => {
    setState((prev) => {
      if (i >= prev.images.length) return prev;

      return {
        ...prev,
        images: prev.images.filter((_, index) => i !== index),
      };
    });

    setDisplayedImg((prev) => {
      if (i >= prev.length) return prev;
      return prev.filter((_, index) => i !== index);
    });
  };

  const onAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    _.forEach(state, (value, key) => {
      if (key === "images") {
        _.forEach(value, (img, i) => {
          formData.append("images", img);
        });
      } else {
        formData.append(key, value);
      }
    });

    addProduct(formData);
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
          <form onSubmit={onAddProduct}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
              <FormInput
                label="Product Name"
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                onChange={onProductChange}
                value={state.name}
              />
              <FormInput
                label="Product Brand"
                type="text"
                name="brand"
                id="brand"
                placeholder="Product Brand"
                onChange={onProductChange}
                value={state.brand}
              />
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
              <FormInput
                label="Category"
                type="text"
                name="category"
                id="category"
                placeholder="-- Select Category --"
                onChange={onProductChange}
                value={categoryName}
                readOnly
                onClick={() => {
                  setShowCategory((prev) => !prev);
                }}
              >
                <div
                  className={`absolute top-[100%] bg-[#475569] w-full transition-all z-10 ${
                    showCategory ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-3 py-1 focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md overflow-hidden"
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue}
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {isGetCategoriesLoading && (
                      <div className="flex justify-center items-center h-[200px] w-full">
                        <PuffLoader color="#3498db" size={60} />
                      </div>
                    )}
                    {allCategories?.data?.map((category) => {
                      return (
                        <div
                          key={category.id}
                          onClick={() => {
                            setShowCategory((prev) => !prev);
                            setState((prev) => ({
                              ...prev,
                              category: category.id,
                            }));
                            setSearchValue("");
                            cancelDebounce();
                            setCategoryName(category.name);
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
              </FormInput>
              <FormInput
                label="Product Stock"
                type="text"
                name="stock"
                id="stock"
                placeholder="Product Stock"
                onChange={onProductChange}
                value={state.stock}
              />
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full">
              <FormInput
                label="Product Price"
                type="number"
                name="price"
                id="price"
                placeholder="Product Price"
                onChange={onProductChange}
                value={state.price}
              />
              <FormInput
                label="Product Discount"
                type="number"
                name="discount"
                id="discount"
                placeholder="Discount by %"
                onChange={onProductChange}
                value={state.discount}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full mb-5">
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
              {displayedImg.map((img, i) => (
                <div className="h-[180px] relative" key={i}>
                  <label htmlFor={i}>
                    <img
                      src={img.url}
                      alt="uploaded-img"
                      className="w-full h-full rounded-sm object-contain cursor-pointer"
                    />
                  </label>
                  <input
                    type="file"
                    id={i}
                    className="hidden"
                    onChange={(e) => onImageReplace(e.target.files[0], i)}
                  />
                  <span
                    onClick={() => onImageRemove(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoIosCloseCircle />
                  </span>
                </div>
              ))}
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

            <div className="mb-3 flex">
              <button
                type="submit"
                className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 mt-2 hover:cursor-pointer min-w-[200px] w-[200px]"
                disabled={isAddLoading}
              >
                {isAddLoading ? (
                  <PropagateLoader cssOverride={overrideStyle} color="#fff" />
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
