import { useEffect, useState, useMemo, useCallback } from "react";
import _ from "lodash";
import { useDebouncedSearch } from "@mern/hooks";

import { useGetCategoriesQuery } from "../../../store/features/categoryApi";
import { getBackendUrl } from "../../../utils/envUtils";

export const defaultProduct = {
  name: "",
  description: "",
  discount: "",
  price: "",
  brand: "",
  stock: "",
  category: "",
  images: [],
};

export default function useProductFormLogic(initialState = defaultProduct) {
  const [state, setState] = useState(initialState);
  const [categoryName, setCategoryName] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [displayedImg, setDisplayedImg] = useState([]);

  const { searchValue, setSearchValue, debouncedSearch } = useDebouncedSearch();

  const categoryQueryArgs = useMemo(
    () => ({ search: debouncedSearch, all: true }),
    [debouncedSearch]
  );

  const { data: allCategories, isLoading: isGetCategoriesLoading } =
    useGetCategoriesQuery(categoryQueryArgs);

  const onImageUpload = (e) => {
    const files = e.target.files;
    if (_.isEmpty(files)) return;

    setState((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    const imgUrl = _.map(files, (file) => ({ url: URL.createObjectURL(file) }));
    setDisplayedImg((prev) => [...prev, ...imgUrl]);
  };

  const onImageReplace = (img, index) => {
    if (!img) return;

    setState((prev) => {
      const newImgs = [...prev.images];
      newImgs[index] = img;
      return { ...prev, images: newImgs };
    });

    setDisplayedImg((prev) => {
      const newImgs = [...prev];
      URL.revokeObjectURL(prev[index]?.url);
      newImgs[index] = { url: URL.createObjectURL(img) };
      return newImgs;
    });
  };

  const onImageRemove = (i) => {
    setState((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => i !== index),
    }));

    setDisplayedImg((prev) => {
      const toRevoke = prev[i];
      if (toRevoke) {
        URL.revokeObjectURL(toRevoke.url);
      }
      return prev.filter((_, index) => i !== index);
    });
  };

  const resetForm = useCallback(() => {
    setState(defaultProduct);
    setCategoryName("");
    setSearchValue("");
    setDisplayedImg([]);
  }, [setSearchValue]);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      displayedImg.forEach((img) => URL.revokeObjectURL(img?.url));
    };
  }, [displayedImg]);

  useEffect(() => {
    if (!state.category || !allCategories?.data?.length) return;

    const matched = allCategories.data.find((c) => c.id === state.category);

    if (matched) {
      setCategoryName(matched.name);
    }
  }, [state?.category, allCategories?.data]);

  useEffect(() => {
    if (!Array.isArray(state.images)) return;

    const validUrls = state.images.filter((img) => typeof img === "string");

    // Only if user hasn’t uploaded any new images
    if (validUrls.length && displayedImg.length === 0) {
      const preloaded = validUrls.map((imgPath) => ({
        url: `${getBackendUrl()}${imgPath}`,
      }));
      setDisplayedImg(preloaded);
    }
  }, [state.images, displayedImg]);

  return {
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
    resetForm,
    allCategories,
    isGetCategoriesLoading,
  };
}
