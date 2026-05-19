import React from "react";
const ProductHeader = ({ name }) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
      <p className="mt-2 text-gray-300">Premium footwear collection</p>
    </div>
  );
};

export default ProductHeader;
