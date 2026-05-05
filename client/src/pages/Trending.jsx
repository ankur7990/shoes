import React from "react";
import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";

const Trending = () => {
  return (
    <>
      <div className="h-screen w-screen bg-amber-200 flex justify-center items-center">
        <div className="h-screen w-screen bg-amber-300 flex justify-center items-center">
          {/* <div className="h-90 w-70 bg-amber-400 radius rounded-xl flex flex-col items-center justify-center gap-3"> */}
          <div className="h-55 w-55 bg-blue-100 rounded-xl border-blue-300 border-2 ">
            <div className="flex flex-col">
              <div className=" flex justify-between items-center bg-amber-100 p-3 ">
                <div className="  w-30 h-6 flex gap-1 justify-center items-center m-1 font-bold p-2">
                  <label>Lebron TR 1</label>
                </div>
                {/* <div className=" bg-amber-500  justify-center items-center m-1 font-bold rounded-2xl p-2"> */}
                <div className="bg-amber-700 h-6 w-6  ">
                  <button>
                    <img src={heart} alt="" />
                  </button>
                </div>
                {/* </div> */}
              </div>
              <div className="  col-start-1 col-end-4 h-40 w-55 flex justify-center items-center">
                <img src={shoes} alt="" />
              </div>

              {/* <div className="bg-amber-500 w-20 h-7 rounded-tl-lg rounded-br-lg col-span-1 col-start-3">
                  50% off
                </div> */}
            </div>
          </div>
          <div className="h-25 w-60  radius rounded-xl flex  justify-between ">
            <div className="  flex flex-col text-left mt-15 pl-3  ">
              {/* <p className="text-black text-xl">NIKE SB</p>
                <p className="text-black">Men's Shoes</p> */}
              <h3 className="text-black text-xl font-semibold pt-2">
                $ 5000.60
              </h3>
            </div>
            <div className="bg-amber-50 h-6 w-6 mt-18 mr-3">
              {" "}
              <button>
                <img src={heart} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Trending;
