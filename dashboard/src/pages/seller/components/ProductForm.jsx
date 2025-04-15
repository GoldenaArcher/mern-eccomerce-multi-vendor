import React from "react";
import { IoIosImage, IoIosCloseCircle } from "react-icons/io";
import FormInput from "../../../components/shared/FormInput";
import { PuffLoader } from "react-spinners";
import {
  ButtonLoader,
  CenteredLoader,
} from "../../../components/shared/loaders";

const ProductForm = ({
  state,
  setState,
  onSubmit,
  displayedImg,
  onImageUpload,
  onImageReplace,
  onImageRemove,
  showCategory,
  setShowCategory,
  categoryName,
  setCategoryName,
  allCategories,
  isGetCategoriesLoading,
  searchValue,
  setSearchValue,
  cancelDebounce,
  submitText = "Submit",
  isSubmitting = false,
}) => {
  const onProductChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Name & Brand */}
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

      {/* Category & Stock */}
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
          onClick={() => setShowCategory((prev) => !prev)}
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
              {isGetCategoriesLoading ? (
                <CenteredLoader
                  className="flex justify-center items-center h-[200px] w-full"
                  loader={<PuffLoader color="#3498db" size={60} />}
                />
              ) : (
                allCategories?.data?.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      setShowCategory(false);
                      setState((prev) => ({
                        ...prev,
                        category: category.id,
                      }));
                      setSearchValue("");
                      cancelDebounce();
                      setCategoryName(category.name);
                    }}
                    className={`w-full cursor-pointer px-4 py-2 hover:bg-indigo-300 hover:text-[#475569] hover:shadow-lg ${
                      state.category === category.id
                        ? "bg-indigo-400 text-[#475569]"
                        : ""
                    }`}
                  >
                    {category.name}
                  </div>
                ))
              )}
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

      {/* Price & Discount */}
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

      {/* Description */}
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
          />
        </div>
      </div>

      {/* Images */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full mb-4">
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
              accept="image/*"
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
          accept="image/*"
          className="hidden"
          onChange={onImageUpload}
        />
      </div>

      {/* Submit Button */}
      <div className="mb-3 flex">
        <button
          type="submit"
          className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 mt-2 hover:cursor-pointer min-w-[200px] w-[200px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? <ButtonLoader /> : submitText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
