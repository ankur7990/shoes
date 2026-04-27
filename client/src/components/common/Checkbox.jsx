import React from "react";

const Checkbox = ({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-4 h-4 accent-blue-600
            ${disabled ? "cursor-not-allowed opacity-50" : ""}
            ${className}
          `}
        />

        {label && (
          <span className="text-sm text-gray-700">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </span>
        )}
      </label>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Checkbox;
