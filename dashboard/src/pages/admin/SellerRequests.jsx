import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { usePaginationSearch } from "@mern/hooks";
import { Pagination } from "@mern/ui";
import { CenteredLoader } from "@mern/ui";

import Table from "../../components/shared/Table";
import Search from "../../components/shared/Search";
import { useGetSellersQuery } from "../../store/features/sellerApi";
import ActionIcon from "../../components/shared/ActionIcon";
import StatusBadge from "../../components/shared/StatusBadge";

const sellersColumnHeader = [
  { name: "No", accessor: "no" },
  { name: "Name", accessor: "name" },
  { name: "Payment Status", accessor: "paymentStatus" },
  { name: "Email", accessor: "email" },
  { name: "Status", accessor: "status" },
  { name: "Action", accessor: "action" },
];

const SellerRequests = () => {
  const {
    searchValue,
    setSearchValue,
    debouncedSearch,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
  } = usePaginationSearch();

  const { data: sellers, isLoading: isGetLoading } = useGetSellersQuery({
    page: currentPage,
    limit: perPage,
    search: debouncedSearch,
    status: "pending",
  });

  const tableData = useMemo(() => {
    if (!sellers?.data) return [];

    return sellers.data.map((seller, i) => ({
      key: seller.id,
      no: (currentPage - 1) * perPage + i + 1,
      name: seller.name,
      email: seller.email,
      paymentStatus: <StatusBadge status={seller.paymentStatus} />,
      status: <StatusBadge status={seller.status} />,
      action: (
        <Link to={`/admin/seller/details/${seller.id}`}>
          <ActionIcon type="view" />
        </Link>
      ),
    }));
  }, [sellers, currentPage, perPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Requests</h1>

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
          <Table columns={sellersColumnHeader} data={tableData} />
        )}

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={sellers?.pagination?.totalItems || 0}
          perPage={perPage}
          showItems={3}
        />
      </div>
    </div>
  );
};

export default SellerRequests;
