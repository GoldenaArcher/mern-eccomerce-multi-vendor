import { Link } from "react-router-dom";

const ShopListPage = () => {
  const mockShops = [
    { id: "a", name: "Luna Store" },
    { id: "b", name: "Galaxy Handmade" },
    { id: "c", name: "BookNest" },
  ];

  return (
    <div className="w-[85%] mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Popular Shops</h1>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-6">
        {mockShops.map((shop) => (
          <Link
            key={shop.id}
            to={`/shops/${shop.id}`}
            className="p-6 border rounded hover:bg-slate-50"
          >
            {shop.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopListPage;
