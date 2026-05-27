import React from "react";

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-7 py-3 text-lg",
};

const QuantityDropdown = ({
  value = 1,
  onChange,
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  useDefaultStyle = true,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        ${useDefaultStyle ? "btn-pill-gradient" : ""}
        ${sizes[size] || ""}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        outline-none rounded-full
        ${className}
      `}
    >
      {[...Array(6)].map((_, index) => (
        <option key={index} value={index} className="text-black">
          {index}
        </option>
      ))}
    </select>
  );
};

export default QuantityDropdown;
