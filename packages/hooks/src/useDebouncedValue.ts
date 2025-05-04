import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

export const useDebouncedValue = <T>(
  value: T,
  delay = 300,
  options?: {
    enabled?: boolean;
    shouldDebounce?: (val: T) => boolean;
    onCancel?: () => void;
  }
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncer = useMemo(() => {
    return debounce((val: T) => {
      setDebouncedValue(val);
    }, delay);
  }, [delay]);

  useEffect(() => {
    if (options?.enabled === false) return;

    if (options?.shouldDebounce?.(value) === false) {
      debouncer.cancel();
      setDebouncedValue(value);
      return;
    }

    debouncer(value);

    return () => {
      debouncer.cancel();
      options?.onCancel?.();
    };
  }, [value, debouncer, options]);

  return debouncedValue;
};
