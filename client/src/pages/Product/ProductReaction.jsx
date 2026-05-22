import { useState } from "react";
import { Heart } from "lucide-react";

const WishlistSlider = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center justify-center">
      {/* Vertical Slider */}
      <div className="relative h-30 w-14 rounded-full border-2 border-[#43e77f] bg-black/30 flex items-start justify-center p-2 bg-amber-100">
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
            w-10
            h-10
            rounded-full
            border-2
            border-[#43e77f]
            shadow-lg
            ${liked ? "bg-[#43e77f] top-18" : "bg-black top-2"}
          `}
        >
          <Heart
            className={`
              w-15
              h-15
              transition-all
              ${liked ? "fill-black text-black" : "text-white"}
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
