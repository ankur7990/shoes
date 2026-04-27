import React from "react";

const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}

      <select
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2 border rounded-lg outline-none
          ${error ? "border-red-500" : "border-gray-300"}
          focus:ring-2 focus:ring-blue-500
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
