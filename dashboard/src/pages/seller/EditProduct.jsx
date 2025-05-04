import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import toast from "react-hot-toast";

import ProductForm from "./components/ProductForm";
import useProductFormLogic from "./hooks/useProductFormLogic";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../store/features/productApi";

const EditProduct = () => {
  const { productId } = useParams();

  const {
    state,
    setState,
    categoryName,
    setCategoryName,
    showCategory,
    setShowCategory,
    searchValue,
    setSearchValue,
    displayedImg,
    onImageUpload,
    onImageReplace,
    onImageRemove,
    allCategories,
    isGetCategoriesLoading,
  } = useProductFormLogic();

  const { data: currProduct, isSuccess: isGetSuccess } =
    useGetProductByIdQuery(productId);

  const [
    updateProduct,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateProductMutation();

  useEffect(() => {
    if (isGetSuccess && currProduct) {
      setState(currProduct?.data);
    }
  }, [isGetSuccess, currProduct, setState]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Product updated successfully");
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isUpdateError) {
      toast.error(updateError?.data?.message);
    }
  }, [isUpdateError, updateError]);

  const onEditProduct = (e) => {
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

    updateProduct({ id: productId, data: formData });
  };

  return (
    <div className="px-2 lg:px-7 pt-5 text-[#d0d2d6]">
      <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-xl font-semibold">Edit Product</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to={"/seller/products"}
          >
            All Products
          </Link>
        </div>

        <ProductForm
          state={state}
          setState={setState}
          onSubmit={onEditProduct}
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
          isSubmitting={isUpdateLoading}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          submitText="Edit Product"
        />
      </div>
    </div>
  );
};

export default EditProduct;
