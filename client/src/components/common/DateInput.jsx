import React from "react";

const DateInput = ({
  register,
  rules = {},
  label,
  name = "dob",
  required = false,
  error,
  min,
  max,
  className = "",
  disableFuture = true,
}) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && "*"}
        </label>
      )}

      <input
        type="date"
        min={min}
        max={disableFuture ? today : max}
        {...register(name, rules)}
        className={`
          input-pill
          ${className}
          ${error ? "border-red-500" : ""}
        `}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default DateInput;
