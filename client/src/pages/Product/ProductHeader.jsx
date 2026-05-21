import React from "react";
const ProductHeader = ({ name }) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold  text-white  underline underline-offset-12 decoration-border-bottom hover:decoration-2 ">
        {name}
      </h1>
      <p className="mt-2 text-gray-300">Premium footwear collection</p>
    </div>
  );
};

export default ProductHeader;
