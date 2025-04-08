// usePaginationSearch.ts
import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";

export const usePaginationSearch = (debounceMs = 300) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const debounceSearch = useMemo(
    () =>
      debounce((val) => {
        setDebouncedSearch(val);
        setCurrentPage(1);
      }, debounceMs),
    [debounceMs]
  );

  const cancelDebounce = () => {
    debounceSearch.cancel();
  };

  useEffect(() => {
    return () => debounceSearch.cancel();
  }, [debounceSearch]);

  const onSearchChange = (val) => {
    setSearchValue(val);
    debounceSearch(val);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return {
    searchValue,
    setSearchValue: onSearchChange,
    debouncedSearch,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    cancelDebounce,
  };
};
