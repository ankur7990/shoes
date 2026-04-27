import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  disabled = false,
  required = false,
  fullWidth = true,
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && "*"}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border rounded-lg outline-none
          transition duration-200
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          focus:ring-2 focus:ring-blue-500
        `}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
