import React from "react";

const AiBrandSelector = ({
  options = [],
  value,
  onChange,
  title = "Select Brand",
}) => {
  return (
    <div className="w-full">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              cursor-pointer
              rounded-full
              border-2
              px-5
              py-2
              transition-all
              duration-200
              ${
                value === option.value
                  ? "bg-[#43e77f] border-[#43e77f] text-black"
                  : "border-[#43e77f] text-white"
              }
            `}
          >
            <input
              type="radio"
              name="brand"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />

            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AiBrandSelector;
