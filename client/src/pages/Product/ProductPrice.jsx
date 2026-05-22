import React from "react";
const ProductPrice = ({ price }) => {
  return (
    <div>
      <p
        className="text-3xl font-bold text-white
      "
      >
        ₹{price}
      </p>
    </div>
  );
};

export default ProductPrice;
