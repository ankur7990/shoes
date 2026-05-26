import React from "react";
const ProductDescription = ({ text }) => {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Description</h2>
      <p className="text-gray-300 leading-7">
        {text} This modern athletic shoe is designed with a breathable mesh
        upper that ensures maximum airflow and all-day comfort. The soft peach
        color gives it a stylish and elegant look, while the iconic side swoosh
        enhances its sporty appeal.
      </p>
    </div>
  );
};

export default ProductDescription;
