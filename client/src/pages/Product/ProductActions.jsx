import React from "react";

import Button from "../../components/common/Button";

const ProductActions = ({ onAddToCart, onBuyNow, cartLoading }) => {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        onClick={onAddToCart}
        disabled={cartLoading}
        className="flex-1"
      >
        {cartLoading ? "Adding..." : "Add to Cart"}
      </Button>

      <Button type="button" onClick={onBuyNow} className="flex-1">
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
