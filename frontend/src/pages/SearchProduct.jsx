import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CenteredLoader, Pagination } from "@mern/ui";
import ProductGrid from "../components/features/products/ProductGrid";
import { useGetProductsQuery } from "../store/features/productApi";
import { useGetCategoriesQuery } from "../store/features/categoryApi";

const sorts = ["created-desc", "created-asc", "price-asc", "price-desc"];

const SearchProduct = () => {
  const [params, setParams] = useSearchParams();
  const search = (params.get("search") || "").trim();
  const category = params.get("category") || "";
  const rawPage = Number(params.get("page") || 1);
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 && rawPage <= 1000000 ? rawPage : 1;
  const rawLimit = Number(params.get("limit"));
  const limit = [6, 12, 24].includes(rawLimit) ? rawLimit : 12;
  const sortBy = sorts.includes(params.get("sortBy")) ? params.get("sortBy") : "created-desc";
  const { data: categories } = useGetCategoriesQuery({ all: true });
  const categoryName = categories?.data?.find(({ id }) => id === category)?.name;
  const { currentData: results, isFetching, isError, error, refetch } = useGetProductsQuery({
    search, categories: category ? [category] : [], page, limit, sortBy,
  });
  const total = results?.pagination?.totalItems || 0;
  const totalPages = results?.pagination?.totalPages || 0;

  useEffect(() => {
    if (!isFetching && !isError && totalPages > 0 && page > totalPages) {
      setParams((previous) => {
        const next = new URLSearchParams(previous);
        next.set("page", String(totalPages));
        return next;
      }, { replace: true });
    }
  }, [isFetching, isError, totalPages, page, setParams]);

  const updateResults = (key, value) => {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (key === "page") {
        const requested = typeof value === "function" ? value(page) : value;
        next.set("page", String(Math.max(1, Math.min(requested, totalPages || 1))));
      } else {
        next.set(key, value);
        next.delete("page");
      }
      return next;
    });
  };

  return (
    <main className="mx-auto w-[85%] py-10 text-slate-700 sm:w-[90%]">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm">
        <Link to="/" className="text-[#059473] hover:underline">Home</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span>Search products</span>
      </nav>
      <h1 className="text-3xl font-bold">{search ? `Results for “${search}”` : "Browse products"}</h1>
      {category && <p className="mt-2">Category: {categoryName || "Selected category"}</p>}
      <div className="my-6 flex flex-wrap items-center justify-between gap-4 rounded-md border p-4">
        <p role="status" aria-live="polite">{isFetching ? "Searching products…" : isError ? "Search unavailable" : `${total} ${total === 1 ? "product" : "products"} found`}</p>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            Sort by
            <select value={sortBy} onChange={(event) => updateResults("sortBy", event.target.value)} className="rounded border p-2">
              <option value="created-desc">Newest first</option>
              <option value="created-asc">Oldest first</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            Per page
            <select value={limit} onChange={(event) => updateResults("limit", event.target.value)} className="rounded border p-2">
              {[6, 12, 24].map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>
        </div>
      </div>
      <section aria-label="Search results" aria-busy={isFetching} className="min-h-[240px]">
        {isFetching ? <CenteredLoader loader={<span className="text-[#059473]">Loading products…</span>} /> : isError ? (
          <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-xl font-semibold">Unable to load products</h2>
            <p className="mt-2">{error?.data?.message || "Please check your connection and try again."}</p>
            <button type="button" onClick={refetch} className="mt-4 rounded bg-[#059473] px-5 py-2 text-white">Try again</button>
          </div>
        ) : !results?.data?.length ? (
          <div className="rounded-md bg-slate-50 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="mt-2">Try another name or choose a different category.</p>
            <Link to="/products/search" className="mt-4 inline-block font-semibold text-[#059473] underline">Browse all products</Link>
          </div>
        ) : (
          <>
            <ProductGrid productList={results.data} showIcons={false} />
            {totalPages > 1 && <Pagination currentPage={page} setCurrentPage={(value) => updateResults("page", value)} totalItems={total} perPage={limit} className="justify-center" />}
          </>
        )}
      </section>
    </main>
  );
};

export default SearchProduct;
