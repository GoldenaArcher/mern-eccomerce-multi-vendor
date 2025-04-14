import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import toast from "react-hot-toast";

import { useAddProductMutation } from "../../store/features/productApi";

import ProductForm from "./components/ProductForm";
import useProductFormLogic from "./hooks/useProductFormLogic";

const AddProduct = () => {
  const {
    state,
    setState,
    categoryName,
    setCategoryName,
    showCategory,
    setShowCategory,
    searchValue,
    setSearchValue,
    cancelDebounce,
    displayedImg,
    onImageUpload,
    onImageReplace,
    onImageRemove,
    allCategories,
    isGetCategoriesLoading,
    resetForm,
  } = useProductFormLogic();

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
      resetForm();
    }
  }, [isAddSuccess, resetForm]);

  useEffect(() => {
    if (isAddError) {
      toast.error(addError?.data?.message);
    }
  }, [isAddError, addError]);

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

        <ProductForm
          state={state}
          setState={setState}
          onSubmit={onAddProduct}
          displayedImg={displayedImg}
          onImageUpload={onImageUpload}
          onImageReplace={onImageReplace}
          onImageRemove={onImageRemove}
          showCategory={showCategory}
          setShowCategory={setShowCategory}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          allCategories={allCategories}
          isGetCategoriesLoading={isGetCategoriesLoading}
          isSubmitting={isAddLoading}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          cancelDebounce={cancelDebounce}
          submitText="Add Product"
        />
      </div>
    </div>
  );
};

export default AddProduct;
