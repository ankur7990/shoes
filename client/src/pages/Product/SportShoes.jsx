import React from "react";
import Product from "../Product";

const SportShoes = () => {
  return (
    <div>
      <div className="bg-gradient-layout-main">
        <div className="flex justify-center  p-10">
          <input type="text" className="  input-pill-category    " />
        </div>
        <div className="flex justify-center">
          <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2 ">
            Sport Shoes
          </p>
        </div>
        <br />
        <div className="px-20">
          <Product />
        </div>
      </div>
    </div>
  );
};

export default SportShoes;
