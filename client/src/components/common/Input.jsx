import React from "react";

const Input = ({
  // label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  disabled = false,
  // required = false,
  fullWidth = true,
  className = "",
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {/* {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && "*"}
        </label>
      )} */}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`input-pill ${className}`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
