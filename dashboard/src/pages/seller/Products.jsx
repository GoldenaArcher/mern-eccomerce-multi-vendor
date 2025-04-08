import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Search from "../../components/shared/Search";
import Table from "../../components/shared/Table";
import Pagination from "../../components/shared/Pagination";
import { useGetProductsQuery } from "../../store/features/productApi";
import { PropagateLoader } from "react-spinners";
import { getBackendUrl } from "../../utils/envUtils";
import { usePaginationSearch } from "../../hooks/usePaginationSearch";

const productsColumnHeader = [
  { name: "No", accessor: "no" },
  { name: "Image", accessor: "image" },
  { name: "Name", accessor: "name" },
  { name: "Brand", accessor: "brand" },
  { name: "Price", accessor: "price" },
  { name: "Discount", accessor: "discount" },
  { name: "Stock", accessor: "stock" },
  { name: "Action", accessor: "action" },
];

const Products = () => {
  const {
    searchValue,
    setSearchValue,
    debouncedSearch,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
  } = usePaginationSearch();

  const {
    data: products,
    isLoading: isGetLoading,
    // isError: isGetError,
    // isSuccess: isGetSuccess,
    // error: getError,
  } = useGetProductsQuery({
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
  });

  const tableData = useMemo(() => {
    if (!products?.data) return [];

    return products?.data?.map((product, index) => {
      const imgUrl =
        product?.images?.length > 0 ? product?.images[0] : product?.image;

      return {
        no: index + 1,
        image: (
          <img
            src={`${getBackendUrl()}${imgUrl}`}
            alt={product?.slug}
            className="w-[45px] h-[45px]"
          />
        ),
        name: product?.name,
        brand: product?.brand,
        price: `$${product?.price}`,
        discount: `${product?.discount}%`,
        stock: product?.stock,
        action: (
          <div className="flex justify-start items-center gap-4">
            <Link
              to={`/seller/products/${product?.id}`}
              className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
            >
              <FaEdit />
            </Link>
            <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
              <FaEye />
            </Link>
            <Link
              to={`/seller/products/${product?._id}`}
              className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
            >
              <FaTrash />
            </Link>
          </div>
        ),
      };
    });
  }, [products]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className=" font-semibold text-lg">All Products</h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          perPage={perPage}
          setPerPage={setPerPage}
        />

        {isGetLoading ? (
          <div className="flex justify-center py-10">
            <PropagateLoader color="#fff" />
          </div>
        ) : (
          <Table columns={productsColumnHeader} data={tableData} />
        )}

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={products?.pagination?.totalItems || 0}
          perPage={perPage}
          showItems={3}
        />
      </div>
    </div>
  );
};

export default Products;
