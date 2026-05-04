import React, { useState } from "react";

const PasswordInput = ({
  // label,
  name,

  placeholder = "Enter password",
  // required = false,
  error,
  className = "",
  register,
  rules = {},

  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )} */}

      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`input-pill ${className} ${error ? "border-red-500" : ""}`}
          {...register(name, rules)}
          {...rest}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-sm text-gray-100 hover:text-gray-200"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
};

export default PasswordInput;
