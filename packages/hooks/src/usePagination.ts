import { useState, useEffect } from "react";

export interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
  totalItems: number;
}

export const usePagination = ({
  initialPage = 1,
  pageSize = 10,
  totalItems,
}: UsePaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(pageSize);

  const totalPages = Math.ceil(totalItems / perPage);

  // 控制跳转页码（防止非法页）
  const setPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  // perPage 改变时重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  return {
    currentPage,
    setCurrentPage: setPage,
    perPage,
    setPerPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: () => setPage(currentPage + 1),
    prevPage: () => setPage(currentPage - 1),
  };
};
