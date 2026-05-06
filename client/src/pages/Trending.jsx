import React from "react";
import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";

const Trending = () => {
  return (
    <>
      <div className="h-screen w-screen  flex justify-center items-center">
        <div className="h-screen w-screen bg-amber-700 flex justify-center items-center">
          <div className="h-50 w-55 bg-blue-200 rounded-xl border-blue-500 border-2 p-2">
            <div className="flex flex-col">
              <div className=" flex justify-between items-center ">
                <div className=" flex gap-1 justify-center items-center  font-bold ">
                  {/* <label className="text-black">Lebron TR 1</label> */}
                  <p className="text-black ">Lebron TR 1</p>
                </div>
                <div className="bg-blue-400 h-6 w-6  ">
                  <button>
                    <img src={heart} alt="" />
                  </button>
                </div>
              </div>
              <div className="pb-5   col-start-1 col-end-4 h-27 w-50 flex justify-center items-center">
                <img src={shoes} alt="" />
              </div>
              <div className=" flex flex-col ">
                <div className=" bg-white w-10 h-5 flex gap-1 text-black text-sm font-medium justify-center items-center m-1 rounded-xl p-1">
                  <span>
                    <img src={heart} className="w-5 " alt="" />
                  </span>
                  <button>4.5</button>
                </div>
                <div className="  text-left pl-1 text-black font-black  ">
                  $ 63.43
                  <span className="text-gray-500 text-[10px]">$76.00</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
