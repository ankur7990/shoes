import React, { useState } from "react";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder = "Enter password",
  required = false,
  error,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 border rounded-xl outline-none
            focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default PasswordInput;
