import React, { useEffect, useState } from "react";
// import heartoutline from "../assets/heartoutline.svg";
// import heartfilled from "../assets/heartfilled.svg";
import Star from "../components/common/Star";
import { adjustColor } from "../utils/colorUtils";
import backstar from "../assets/backstar.png";
import {
  createProductLikes,
  deleteProductLikes,
  getProductLikes,
} from "../api/productService";
// import { handleApiError } from "../api/errorHandler";
import { useAuth } from "../context/AuthContext";
import { getProductImage } from "../utils/productUtils";
import { useNavigate } from "react-router-dom";
import BackStar from "./Product/BackStar";

// import shoes from "../assets/shoes.png";

const Product = ({ data }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  const [likeLoading, setLikeLoading] = useState(false);
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useAuth();
  // console.log(user?.id);

  const userId = user?.id;
  // console.log("Product data passed :", data);

  // const imageUrl = data.product_images?.[0]?.image;
  // const imageUrl = data.image;
  const imageUrl = getProductImage(data);
  const baseColor = data.color;
  const primaryColor = baseColor;
  const secondaryColor = adjustColor(baseColor, -20);
  const thirdColor = adjustColor(baseColor, 20);

  const [isHover, setIsHover] = useState(false);

  //likes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await getProductLikes();
        const likes = res.data;

        const found = likes.find(
          (like) =>
            Number(like.user) === Number(userId) &&
            Number(like.product) === Number(data.id),
        );

        if (found) {
          setIsLiked(true);
          setLikeId(found.id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) fetchLikes();
  }, [userId, data.id]);

  //unlike
  const handleLikeClick = async () => {
    try {
      if (isLiked && likeId) {
        await deleteProductLikes(likeId);
        setIsLiked(false);
        setLikeId(null);
      } else {
        const res = await createProductLikes({
          user: userId,
          product: data.id,
        });

        setIsLiked(true);
        setLikeId(res.data.id); // if backend returns created like record
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductClick = () => {
    console.log("click and navigate.");

    // getProductByProductId
    console.log("Path is ", data.id);

    navigate(`/product/${data.id}`);
  };

  return (
    <div
      // className="  flex justify-center items-center   cursor-pointer"
      className="flex w-full cursor-pointer justify-center"
      onClick={handleProductClick}
    >
      <div
        // className="h-90 w-60  radius rounded-xl flex flex-col items-center justify-center gap-3"
        className="flex w-full max-w-70 flex-col items-center justify-center gap-3 rounded-2xl p-3 transition-all duration-300 hover:scale-[1.02]"
        style={{ backgroundColor: `${primaryColor}` }}
      >
        <div
          // className="h-55 w-55 bg rounded-2xl cursor-pointer "
          className="aspect-square w-full overflow-hidden rounded-2xl"
          // className="h-55 w-55 bg rounded-xl overflow-hidden
          //   transition-all duration-300
          //   hover:scale-105
          //   cursor-pointer"
          style={{ backgroundColor: `${secondaryColor}` }}
        >
          {/* <div
              // className="grid grid-col-4 items-baseline bg-contain bg-center bg-no-repeat  "
              className="grid h-full w-full grid-cols-4 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backstar})` }}
            > */}
          <div className="relative grid h-full w-full grid-cols-4 overflow-hidden">
            {/* SVG Background */}
            <BackStar color={thirdColor} />
            {/* Content */}
            <div className="relative z-10 col-span-1 col-start-1 h-8 w-15">
              <div className="m-3 flex h-6 w-15 items-center justify-center gap-1 rounded-2xl bg-white p-1">
                <span>
                  <Star className="h-6 w-6" />
                </span>

                <button>{data.id}</button>
              </div>
            </div>

            <div className="relative z-10 col-span-4 flex h-40 items-center justify-center">
              {/* old style  */}
              {/* <img
                  src={imageUrl}
                  alt={data.name}
                  className="h-36 scale-120 rotate-[-18deg] object-contain transition-transform duration-300 hover:scale-105 sm:h-40 md:h-44"
                /> */}

              {/* For a Nike/Adidas style card look, try: */}
              <img
                src={imageUrl}
                alt={data.name}
                className="h-44 scale-125 -rotate-20 object-contain transition-all duration-500 hover:scale-135 hover:-rotate-12 sm:h-48 md:h-52"
              />
            </div>

            {/* old style  */}
            {/* <div className="percentageColor relative z-10 col-span-1 col-start-3 mt-2 mr-2 justify-self-end rounded-tl-lg rounded-br-lg bg-white px-3 py-1 text-xs font-semibold">
                50% off
              </div> */}
            {/* top right */}
            {/* <div className="percentageColor absolute top-3 right-3 z-20 rounded-full bg-white px-3 py-1 text-xs font-bold shadow-lg">
                50% OFF
              </div> */}
            {/* bottom right */}
            <div className="absolute right-2 bottom-2 z-20 rounded-full border border-white/30 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
              50% OFF
            </div>
            {/* <div className="col-span-1 col-start-1 h-8 w-15">
                <div className="m-3 flex h-6 w-15 items-center justify-center gap-1 rounded-2xl bg-white p-1">
                  <span>
                    <Star className="h -6 w-6" />
                  </span>
                  <button> {data.id}</button>
                </div>
              </div> */}
            {/* <div className="col-start-1 col-end-4 flex h-40 w-55 items-center justify-center"> */}
            {/* {imageUrl ? <img src={imageUrl} alt={data.name} /> : null} */}
            {/* <img
                  src={imageUrl}
                  alt={data.name}
                  className="h-36 object-contain transition-transform duration-300 hover:scale-105 sm:h-40 md:h-44"
                /> */}
            {/* </div> */}

            {/* <div className="bg-white percentageColor font-semibold w-20 h-7 rounded-tl-lg rounded-br-lg col-span-1 col-start-3">
                50% off
              </div> */}
            {/* <div className="percentageColor percentageColor col-span-1 col-start-3 mt-2 mr-2 justify-self-end rounded-tl-lg rounded-br-lg bg-white px-3 py-1 text-xs font-semibold">
                50% off
              </div> */}
          </div>
        </div>
        {/* <div className="h-25 w-60  radius rounded-xl flex  justify-between  "> */}
        <div className="flex w-full items-end justify-between pt-2">
          <div className="my-2 ml-3 flex flex-col text-left">
            {/* <p className="text-black text-xl"> {data.name}</p> */}
            <p className="text-base font-semibold text-black sm:text-lg">
              {" "}
              {data.name}
            </p>

            {/* <p className="text-[#A58855]"> {data.brand}</p> */}
            <p className="text-sm text-[#A58855]"> {data.brand}</p>

            {/* <h3 className="text-black text-xl font-semibold pt-2">
                $ {data.price}
              </h3> */}
            <h3 className="pt-2 text-lg font-bold text-black sm:text-xl">
              $ {data.price}
            </h3>
          </div>
          {/* <div
              //     className=" h-6 w-6 mt-18 mr-3 rounded-2xl transition-all duration-300
              //  cursor-pointer"
              className="mr-3 mb-2 h-6 w-6 cursor-pointer self-end rounded-2xl transition-all duration-300"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={{
                backgroundColor: isHover
                  ? `${secondaryColor}`
                  : `${thirdColor}`,
              }}
            >
              {" "}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick();
                }}
                className="cursor-pointer"
                disabled={likeLoading}
              >
                {" "}
                {/* {isLiked ? "❤️" : "🤍"} */}
          {/* {likeLoading ? "..." : isLiked ? "❤️" : "🤍"} */}
          {/* <img
                  src={isLiked ? heartfilled : heartoutline}
                  alt="like"
                  text-white
                /> */}
          {/* </button>
            </div> */}

          {/* new code for like bnutton  */}
          {/* <div
              className="mr-3 mb-2 flex h-10 w-10 cursor-pointer items-center justify-center self-end rounded-full bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                handleLikeClick();
              }}
            >
              <span
                className={`text-xl transition-all duration-300 ${isLiked ? "scale-110" : ""} `}
              >
                {isLiked ? "❤️" : "🤍"}
              </span>
            </div> */}
          {/* <div
              className="mr-3 mb-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              onClick={(e) => {
                e.stopPropagation();
                handleLikeClick();
              }}
            >
              <span className="text-xl transition-all duration-300">
                {isLiked ? "❤️" : "🖤"}
              </span>
            </div> */}

          <div
            className="mr-3 mb-2 flex h-10 w-10 cursor-pointer items-center justify-center self-end rounded-full bg-white/30 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              handleLikeClick();
            }}
          >
            <span className="text-xl transition-all duration-300">
              {likeLoading ? "..." : isLiked ? "❤️" : "🤍"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
