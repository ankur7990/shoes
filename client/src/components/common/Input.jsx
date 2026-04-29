import React from "react";

const Input = ({
  type = "text",
  placeholder,
  name,
  disabled = false,
  fullWidth = true,
  className = "",
  register,
  rules = {},
  error,
  ...rest
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, rules)}
        {...rest}
        className={`input-pill ${className} ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
