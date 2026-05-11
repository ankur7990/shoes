import React, { useRef, useState, useEffect } from "react";

const Dropdown = ({
  // label,
  value,
  name,
  onChange,
  options = [],
  register,
  rules = {},
  placeholder = "Select Gender",
  error,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((item) => item.value === value)?.label || "";

  return (
    <div ref={wrapperRef} className="relative w-full grow">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`input-pill-category flex items-center justify-between ${className} ${
          error ? "border-red-500" : ""
        }`}
      >
        <span className={selectedLabel ? "text-white" : "text-[#dddddd]"}>
          {selectedLabel || placeholder}
        </span>

        <span className="text-[#43e77f]">v</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-[#43e77f] bg-[#0f172a] shadow-lg">
          {options.map((option, index) => (
            <button
              key={option.value || index}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="w-full px-5 py-3 text-left text-white transition-colors hover:bg-[#43e77f]/15"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
    // <div className="w-full ">
    //   {/* {label && (
    //     <label className="block mb-1 text-sm font-medium">{label}</label>
    //   )} */}

    //   <select
    //     {...register(name, rules)}
    //     className={`input-pill ${className} ${error ? "border-red-500" : ""}`}
    //   >
    //     <option value="">{placeholder}</option>

    //     {options.map((option, index) => (
    //       <option key={option.value || index} value={option.value}>
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>

    //   {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    // </div>
  );
};

export default Dropdown;
