import React from "react";

const SearchBar = () => {
  return (
    <div className="relative">
      <div className="flex justify-center p-10">
        <div className="relative w-full max-w-md flex items-center">
          <input
            type="text"
            className="input-pill-category w-full pl-12 pr-4 py-2"
            placeholder="Search Shoes"
          />
          <div class="absolute left-0 inset-y-0 flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-3 text-white hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
