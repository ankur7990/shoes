import React from "react";

const Input = ({
  // label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
  // required = false,
  fullWidth = true,
  className = "",
  register,
  rules = {},
  error,
  ...rest
}) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {/* {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && "*"}
        </label>
      )} */}
      <input
        {...register(name, rules)}
        {...rest}
        type={type}
        name={name}
        value={value}
        // {...register(name, rules)}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={`input-pill ${className}  ${error ? "border-red-500" : ""}`}
      />
      console.log(register);
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
