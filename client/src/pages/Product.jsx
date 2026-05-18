import React, { useState } from "react";
import heart from "../assets/heart.svg";
import Star from "../components/common/Star";
import { adjustColor } from "../utils/colorUtils";

// import shoes from "../assets/shoes.png";

const Product = ({ data }) => {
  const imageUrl = data.product_images?.[0]?.image;
  const baseColor = data.color;
  const primaryColor = baseColor;
  const secondaryColor = adjustColor(baseColor, -20);
  const thirdColor = adjustColor(baseColor, 20);

  const [isHover, setIsHover] = useState(false);

  function handleLikeClick() {
    console.log("Product button clicked.");
    console.log(baseColor, secondaryColor, thirdColor);
  }
  return (
    // <div className="  flex justify-center items-center bg-amber-100">
    //   <div className="  flex flex-row gap-25">
    <div
      className="h-90 w-60  radius rounded-xl flex flex-col items-center justify-center gap-3"
      style={{ backgroundColor: `${primaryColor}` }}
    >
      <div
        className="h-55 w-55 bg rounded-2xl cursor-pointer "
        // className="h-55 w-55 bg rounded-xl overflow-hidden
        //   transition-all duration-300
        //   hover:scale-105
        //   cursor-pointer"
        style={{ backgroundColor: `${secondaryColor}` }}
      >
        <div className="grid grid-col-4 items-baseline ">
          <div className="  w-15 h-8 col-span-1 col-start-1">
            <div className=" bg-white w-15 h-6 flex gap-1 justify-center items-center m-3 rounded-2xl p-1">
              <span>
                {/* <img src={star} className="w-5 " alt="" /> */}
                <Star className="w-6 h  -6" />
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

          <div className="bg-white percentageColor font-semibold w-20 h-7 rounded-tl-lg rounded-br-lg col-span-1 col-start-3">
            50% off
          </div>
        </div>
      </div>
      <div className="h-25 w-60  radius rounded-xl flex  justify-between  ">
        <div className="  flex flex-col text-left ml-3 my-2  ">
          <p className="text-black text-xl"> {data.name}</p>
          <p className="text-[#A58855]"> {data.brand}</p>
          <h3 className="text-black text-xl font-semibold pt-2">
            $ {data.price}
          </h3>
        </div>
        <div
          className=" h-6 w-6 mt-18 mr-3 rounded-2xl transition-all duration-300
           cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{
            backgroundColor: isHover ? `${secondaryColor}` : `${thirdColor}`,
          }}
        >
          {" "}
          <button onClick={handleLikeClick}>
            {/* <img src={heart} alt="" text-white /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default Product;
