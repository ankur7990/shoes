import React from "react";
const ProductPrice = ({ price }) => {
  return (
    <div>
      <p className="text-3xl font-bold text-[#43e77f]">₹{price}</p>
    </div>
  );
};

export default ProductPrice;
