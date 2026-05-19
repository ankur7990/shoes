import React from "react";

const DeliveryReturns = ({ deliveryText, returnsText }) => {
  return (
    <div className="space-y-2">
      <div className="rounded-2xl border border-[#43e77f] p-4">
        <h3 className="font-semibold">Delivery</h3>
        <p className="text-sm text-gray-300">{deliveryText}</p>
      </div>

      <div className="rounded-2xl border border-[#43e77f] p-4">
        <h3 className="font-semibold">Returns</h3>
        <p className="text-sm text-gray-300">{returnsText}</p>
      </div>
    </div>
  );
};

export default DeliveryReturns;
