import React from "react";

const Search = ({ perPage, setPerPage, searchValue, setSearchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        name="perPage"
        id="perPage"
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
        onChange={(e) => {
          setPerPage(parseInt(e.target.value));
        }}
        value={perPage}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <input
        type="text"
        placeholder="search"
        className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
