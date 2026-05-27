import React from "react";

import Button from "../../components/common/Button";

const ProductActions = ({
  onAddToCart,
  onBuyNow,
  cartLoading,
  selectedSize,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        type="button"
        onClick={onAddToCart}
        disabled={cartLoading || !selectedSize}
        className={`
          flex-1
          rounded-2xl
          px-6
          py-4
          font-semibold
          transition-all
          duration-300
          border
          border-[#43e77f]
          ${
            cartLoading || !selectedSize
              ? "cursor-not-allowed opacity-70 bg-[#43e77f] text-black"
              : "bg-[#43e77f] text-black hover:scale-[1.02] hover:shadow-lg"
          }
        `}
      >
        {cartLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
            Adding...
          </div>
        ) : (
          "Add to Cart"
        )}
      </Button>

      <Button
        type="button"
        onClick={onBuyNow}
        className="
          flex-1
          rounded-2xl
          border
          border-white/30
          bg-white/10
          px-6
          py-4
          font-semibold
          text-white
          backdrop-blur-md
          transition-all
          duration-300
          hover:bg-white/20
          hover:scale-[1.02]
        "
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
