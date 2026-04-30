import React from "react";

const Dropdown = ({
  // label,
  name,
  options = [],
  register,
  rules = {},
  placeholder = "Select Gender",
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      {/* {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )} */}

      <select
        {...register(name, rules)}
        className={`input-pill ${className} ${error ? "border-red-500" : ""}`}
      >
        <option value="">{placeholder}</option>

        {options.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Dropdown;
