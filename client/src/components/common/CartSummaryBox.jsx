import React from "react";

const CartSummaryBox = ({
  subtotal = 0,
  delivery = 0,
  total = 0,
  className = "",
}) => {
  const rows = [
    { label: "Subtotal", value: subtotal },
    { label: "Delivery", value: delivery },
    { label: "Total", value: total },
  ];

  return (
    <div
      className={`
        w-full rounded-3xl border-2 border-[#43e77f]
        bg-transparent p-5 text-white
        ${className}
      `}
    >
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-2xl border border-[#43e77f]/30 px-4 py-3"
          >
            <span className="text-sm text-gray-300">{row.label}</span>
            <span className="text-sm font-semibold">₹{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSummaryBox;
