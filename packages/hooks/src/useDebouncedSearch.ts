import { useState } from "react";
import { useDebouncedValue } from "./useDebouncedValue";

export interface UseDebouncedSearchOptions {
  debounceMs?: number;
  resetOnClear?: boolean;
}

export const useDebouncedSearch = ({
  debounceMs = 300,
  resetOnClear = false, // reset debounced search when search value is cleared
}: UseDebouncedSearchOptions = {}) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebouncedValue(searchValue, debounceMs, {
    shouldDebounce: (val) => !(resetOnClear && val === ""),
    onCancel: () => {
      if (resetOnClear && searchValue === "") {
        setSearchValue(""); // reset search value
      }
    },
  });

  return {
    searchValue,
    debouncedSearch,
    setSearchValue,
  };
};
