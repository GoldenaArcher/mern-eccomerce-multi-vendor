import { usePagination, UsePaginationOptions } from "./usePagination";
import { useDebouncedSearch, UseDebouncedSearchOptions } from "./useDebouncedSearch";
import { useEffect } from "react";

export const usePaginationSearch = (
  totalItems: number,
  options?: {
    pagination?: Partial<UsePaginationOptions>;
    search?: UseDebouncedSearchOptions;
  }
) => {
  const {
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  } = usePagination({
    totalItems,
    ...(options?.pagination ?? {}),
  });

  const {
    searchValue,
    debouncedSearch,
    setSearchValue,
    cancelDebounce,
  } = useDebouncedSearch(options?.search);

  // when debounced search changes, reset current page to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return {
    searchValue,
    debouncedSearch,
    setSearchValue,
    cancelDebounce,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  };
};
