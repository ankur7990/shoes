import React from "react";

const DeliveryReturns = ({ deliveryText, returnsText }) => {
  return (
    <div className="space-y-2">
      <div className="rounded-2xl border border-[#43e77f] p-4">
        <h3 className="font-semibold">Delivery</h3>
        <p className="text-sm text-gray-300">
          {deliveryText}All purchases are subject to delivery fees.
        </p>
        <p className="text-sm text-gray-300">
          Standard delivery 4–9 business days.
        </p>
      </div>

      <div className="rounded-2xl border border-[#43e77f] p-4">
        <h3 className="font-semibold">Returns</h3>
        <p className="text-sm text-gray-300">{returnsText}</p>
        <p className="text-sm text-gray-300">
          Orders are processed and delivered Monday–Friday (excluding public
          holidays)
        </p>
      </div>
    </div>
  );
};

export default DeliveryReturns;
