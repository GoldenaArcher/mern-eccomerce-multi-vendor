import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Params = {
  page?: number;
  limit?: number;
  search?: string;
  isAll?: boolean;
};

type InfiniteQueryOptions<T> = {
  limit?: number;
  initialPage?: number;
  trigger: (params: Params) => Promise<{ data: { data: T[] } }>;
};

export const useInfiniteQuery = <T>({
  limit = 10,
  initialPage = 1,
  trigger,
}: InfiniteQueryOptions<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMore = useCallback(async () => {
    if (!hasMore || !inView) return;

    const res = await trigger({ page, limit });
    const fetched = res.data.data ?? [];

    setData((prev) => [...prev, ...fetched]);
    setHasMore(fetched.length === limit);
    setPage((prev) => prev + 1);
  }, [hasMore, inView, page, limit, trigger]);

  useEffect(() => {
    if (inView) loadMore();
  }, [loadMore, inView]);  

  return { data, hasMore, ref };
};
