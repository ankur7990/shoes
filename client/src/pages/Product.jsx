import React, { useEffect, useState } from "react";
import heartoutline from "../assets/heartoutline.svg";
import heartfilled from "../assets/heartfilled.svg";
import Star from "../components/common/Star";
import { adjustColor } from "../utils/colorUtils";
import backstar from "../assets/backstar.png";
import { createProductLikes, getProductLikes } from "../api/productService";
import { handleApiError } from "../api/errorHandler";

// import shoes from "../assets/shoes.png";

const Product = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  console.log("first get user", user);
  console.log("user id", userId);

  // console.log("Product data passed :", data);

  const imageUrl = data.image;
  const baseColor = data.color;
  const primaryColor = baseColor;
  const secondaryColor = adjustColor(baseColor, -20);
  const thirdColor = adjustColor(baseColor, 20);

  const [isHover, setIsHover] = useState(false);

  const checkLikeStatus = async () => {
    console.log("first check if there is like products.");

    try {
      const res = await getProductLikes();
      const likes = res.data;
      console.log("get product likes", res.data);

      const liked = likes.some(
        (like) =>
          Number(like.user) === Number(userId) &&
          Number(like.product) === Number(data.id),
      );

      setIsLiked(liked);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (userId && data?.id) {
      checkLikeStatus();
    }
  }, [userId, data?.id]);

  const handleLikeClick = async () => {
    if (!userId) return;
    console.log("like btn clicked");
    try {
      setLikeLoading(true);

      await createProductLikes({
        user: userId,
        product: data.id,
      });

      setIsLiked(true);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLikeLoading(false);
    }
  };
  return (
    <div className="  flex justify-center items-center ">
      <div className="  flex flex-row gap-25">
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
                    <Star className="w-6 h  -6" />
                  </span>
                  <button> {data.id}</button>
                </div>
              </div>
              <div className="  col-start-1 col-end-4 h-40 w-55 flex justify-center items-center">
                {imageUrl ? <img src={imageUrl} alt={data.name} /> : null}
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
              // onMouseEnter={() => setIsHover(true)}
              // onMouseLeave={() => setIsHover(false)}
              style={
                {
                  // backgroundColor: isHover
                  //   ? `${secondaryColor}`
                  //   : `${thirdColor}`,
                }
              }
            >
              {" "}
              <button
                onClick={handleLikeClick}
                className="cursor-pointer"
                disabled={likeLoading}
              >
                <img
                  src={isLiked ? heartfilled : heartoutline}
                  alt="like"
                  text-white
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
