import React from "react";
import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";
import shoesCross from "../assets/shoesCross.png";

const Male = () => {
  return (
    <div>
      <div className="h-screen w-screen  flex justify-center items-center">
        <div className="h-screen w-screen bg-amber-700 flex justify-center items-center">
          <div className="h-50 w-70 bg-green-200 rounded-xl  p-5">
            <div className="flex ">
              <div className=" flex flex-col gap-5  ">
                <div className="  text-left pl-1 text-black font-mono  ">
                  Sports Shoes
                </div>
                <div className=" bg-white w-15 h-5 flex gap-1 text-black text-sm font-medium justify-center items-center m-1 rounded-xl p-1">
                  <span>
                    <img src={heart} className="w-5 " alt="" />
                  </span>
                  <button>4.5</button>
                </div>
              </div>
              <div className="  ">
                <img src={shoesCross} alt="" />
                {/* <p className="">ankur</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Male;
