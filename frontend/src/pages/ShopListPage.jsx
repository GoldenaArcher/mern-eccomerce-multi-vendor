import { Link } from "react-router-dom";
import { useLazyGetShopsQuery } from "../store/features/shopApi";
import { useInfiniteQuery } from "@mern/hooks";

const ShopListPage = () => {
  const [trigger] = useLazyGetShopsQuery();

  const {
    data: shops,
    hasMore,
    ref: loaderRef,
  } = useInfiniteQuery({
    trigger,
    limit: 10,
  });

  return (
    <div className="w-[85%] mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Popular Shops</h1>
      <div className="grid grid-cols-4 md-lg:grid-cols-2 sm:grid-cols-1 gap-6">
        {shops.map((shop) => (
          <Link
            key={shop.id}
            to={`/shops/${shop.id}`}
            className="p-6 border rounded hover:bg-slate-50"
          >
            {shop.name}
          </Link>
        ))}
      </div>

      {hasMore && <div ref={loaderRef}>Loading more...</div>}
    </div>
  );
};

export default ShopListPage;
