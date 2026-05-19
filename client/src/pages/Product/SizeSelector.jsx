import React from "react";
const SizeSelector = ({ sizes = [], selectedSize, onSelectSize }) => {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Select Size</h2>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => {
          const active = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`h-11 min-w-11 rounded-full border px-4 text-sm font-medium transition-all
                ${
                  active
                    ? "bg-[#43e77f] text-black border-[#43e77f]"
                    : "border-[#43e77f] text-white bg-transparent"
                }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
