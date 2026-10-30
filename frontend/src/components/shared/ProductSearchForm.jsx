import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ProductSearchForm = ({ categories = [], categoriesLoading = false, categoriesError = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const submittedSearch = params.get("search") || "";
  const submittedCategory = params.get("category") || "";
  const [search, setSearch] = useState(submittedSearch);
  const [category, setCategory] = useState(submittedCategory);

  useEffect(() => {
    setSearch(pathname === "/products/search" ? submittedSearch : "");
    setCategory(pathname === "/products/search" ? submittedCategory : "");
  }, [pathname, submittedSearch, submittedCategory]);

  const onSubmit = (event) => {
    event.preventDefault();
    const next = pathname === "/products/search" ? new URLSearchParams(params) : new URLSearchParams();
    if (search.trim()) next.set("search", search.trim());
    else next.delete("search");
    if (category) next.set("category", category);
    else next.delete("category");
    next.delete("page");
    navigate({ pathname: "/products/search", search: next.toString() });
  };

  return (
    <form role="search" aria-label="Product search" onSubmit={onSubmit}>
      <div className="flex min-h-[50px] items-stretch border border-gray-300 sm:flex-wrap">
        <select
          aria-label="Search category"
          value={category}
          disabled={categoriesLoading}
          onChange={(event) => setCategory(event.target.value)}
          className="w-[160px] min-w-0 border-r border-gray-300 bg-white px-2 py-3 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-emerald-600 sm:w-full sm:border-b sm:border-r-0"
        >
          <option value="">{categoriesLoading ? "Loading categories…" : "All categories"}</option>
          {category && !categories.some(({ id }) => id === category) && (
            <option value={category}>Selected category</option>
          )}
          {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
        <input
          aria-label="Search products"
          name="search"
          type="search"
          maxLength={200}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
          className="min-w-0 flex-1 bg-transparent p-3 text-slate-600 outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <button type="submit" className="bg-[#059473] px-5 py-3 font-semibold uppercase text-white hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
          Search
        </button>
      </div>
      {categoriesError && <p className="mt-1 text-sm text-slate-600">Categories are unavailable. Choose All categories to search across products.</p>}
    </form>
  );
};

export default ProductSearchForm;
