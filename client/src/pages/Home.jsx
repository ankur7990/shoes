import React from "react";

const Home = () => {
  return (
    <div>
      <div className="h-screen w-screen bg-amber-200 flex justify-center items-center">
        <div className="h-screen w-screen bg-amber-300 flex justify-center items-center">
          <div className="h-90 w-60 bg-amber-400 radius rounded-xl flex flex-col items-center justify-center gap-3">
            <div className="h-55 w-55 bg-amber-100  rounded-xl">card</div>
            <div className="h-25 w-60 bg-amber-600 radius rounded-xl flex  justify-between ">
              <div className=" bg-amber-800 flex flex-col justify-start align-start  ">
                <p>NIKE SB</p>
                <p>Men's Shoes</p>
                <h3>$ 500.60</h3>
              </div>
              <div className="bg-amber-50 h-6 w-6 mt-15 mr-3">
                {" "}
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
