import { useState } from "react";
import { Heart } from "lucide-react";

const WishlistSlider = ({ initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);

  return (
    <div className="flex items-center justify-center">
      {/* Vertical Slider */}
      <div className="relative h-30 w-10 rounded-full   flex items-start justify-center p-2 bg-[#D9D9D9]">
        {/* Slider Handle */}
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className={`
           absolute
    transition-all
    duration-300
    ease-in-out
    flex
    items-center
    justify-center
    w-15
    h-15
    rounded-full
    shadow-lg
    ${liked ? "bg-[#FF2E2E] top-0" : "bg-white top-18"}
          `}
        >
          <Heart
            strokeWidth={0}
            className={`
    w-8
    h-8
    transition-all
    ${liked ? "fill-white text-white" : "fill-black text-black"}
  `}
          />
        </button>

        {/* Slider Line */}
        {/* <div className="absolute top-5 bottom-5 w-1 rounded-full bg-[#D9D9D9]" /> */}
      </div>
    </div>
  );
};

export default WishlistSlider;
