import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";

export interface UseDebouncedSearchOptions {
  debounceMs?: number;
  resetOnClear?: boolean; 
}

export const useDebouncedSearch = ({
  debounceMs = 300,
  resetOnClear = false, // reset debounced search when search value is cleared
}: UseDebouncedSearchOptions = {}) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounceSearch = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearch(val);
      }, debounceMs),
    [debounceMs]
  );

  const onSearchChange = (val: string) => {
    setSearchValue(val);
    if (resetOnClear && val === "") {
      debounceSearch.cancel();
      setDebouncedSearch("");
    } else {
      debounceSearch(val);
    }
  };

  // clear debounce
  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  return {
    searchValue,
    debouncedSearch,
    setSearchValue: onSearchChange,
    cancelDebounce: debounceSearch.cancel,
  };
};
