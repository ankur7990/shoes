import React from "react";

const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      {/* {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )} */}

      <select
        value={value}
        onChange={onChange}
        className={`input-pill ${className}`}
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
