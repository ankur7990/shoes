import React from "react";

const DateInput = ({
  label,
  value,
  onChange,
  name = "dob",
  required = false,
  error,
  min,
  max,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && "*"}
        </label>
      )}

      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`
          w-full px-4 py-2 border rounded-lg outline-none
          ${error ? "border-red-500" : "border-gray-300"}
          focus:ring-2 focus:ring-blue-500
        `}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
