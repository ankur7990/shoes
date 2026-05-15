import React from "react";
import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";

const Product = ({ data }) => {
  const imageUrl = data.product_images?.[0]?.image;

  return (
    // <div className="  flex justify-center items-center bg-amber-100">
    //   <div className="  flex flex-row gap-25">
    <div className="h-90 w-60 bg-amber-900 radius rounded-xl flex flex-col items-center justify-center gap-3">
      <div className="h-55 w-55 bg-amber-100 rounded-xl">
        <div className="grid grid-col-4 items-baseline ">
          <div className="  w-15 h-8 col-span-1 col-start-1">
            <div className=" bg-amber-500 w-15 h-6 flex gap-1 justify-center items-center m-1 rounded-2xl p-1">
              <span>
                <img src={heart} className="w-5 " alt="" />
              </span>
              <button> {data.id}</button>
            </div>
          </div>
          <div className="  col-start-1 col-end-4 h-40 w-55 flex justify-center items-center">
            {imageUrl ? <img src={imageUrl} alt={data.name} /> : null}
            {/* <img src={data.img} alt="" /> */}
            {/* {data.product_images.map((image) => (
                    <img key={image.id} src={image.image} alt={image.alt} />
                  ))} */}
          </div>

          <div className="bg-amber-500 w-20 h-7 rounded-tl-lg rounded-br-lg col-span-1 col-start-3">
            50% off
          </div>
        </div>
      </div>
      <div className="h-25 w-60  radius rounded-xl flex  justify-between ">
        <div className="  flex flex-col text-left ml-3 my-2  ">
          <p className="text-black text-xl"> {data.name}</p>
          <p className="text-black"> {data.brand}</p>
          <h3 className="text-black text-xl font-semibold pt-2">
            $ 5000.60 {data.price}
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
    //   </div>
    // </div>
  );
};

export default Product;
