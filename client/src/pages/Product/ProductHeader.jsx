import React from "react";
const ProductHeader = ({ name, brand, text }) => {
  return (
    <div className="">
      <h1 className=" md:text-4xl font-bold text-2xl text-white  underline underline-offset-12 decoration-border-bottom hover:decoration-2 ">
        {name}
      </h1>
      <p className="mt-2 text-gray-300">{brand}</p>
      <p className="mt-2 text-gray-300">{text}</p>
    </div>
  );
};

export default ProductHeader;
