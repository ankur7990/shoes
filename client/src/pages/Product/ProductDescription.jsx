import React from "react";
const ProductDescription = ({ text }) => {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Description</h2>
      <p className="text-gray-300 leading-7">{text}</p>
    </div>
  );
};

export default ProductDescription;
