import React from "react";
import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";
import shoesCross from "../assets/shoesCross.png";
import getAllProducts from "../api/productService";
import { useNavigate } from "react-router-dom";

const Category = ({ data }) => {
  const navigate = useNavigate();
  console.log("data passed", data);

  async function handleDivClick(e) {
    // here onclick, get the all sports shoes.
    console.log("Clicked card ID:", e.currentTarget.id);
    //get all shoes here first, then filter

    const allP = await getAllProducts();
    console.log(allP.data);

    navigate("/sportshoes");
  }
  return (
    <div className=" ">
      <div
        className="h-50 w-70 bg-green-200 rounded-xl p-5 "
        onClick={handleDivClick}
        id={data.id}
      >
        <div className="flex ">
          <div className=" flex flex-col gap-5  ">
            <div className="  text-left pl-1 text-black font-mono  ">
              {/* Sports Shoes */}
              {data.name}
            </div>
            <div className=" bg-white w-15 h-5 flex gap-1 text-black text-sm font-medium justify-center items-center m-1 rounded-xl p-1">
              <span>
                <img src={heart} className="w-5 " alt="" />
              </span>
              <button>
                {/* 4.5 */}
                {data.review}
              </button>
            </div>
          </div>
          <div className="  ">
            <img src={data.img} alt="" />
            {/* <img src={shoesCross} alt="" /> */}
            {/* <p className="">ankur</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
