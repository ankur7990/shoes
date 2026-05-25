import React from "react";

import Button from "../../components/common/Button";

const ProductActions = ({ onAddToCart, onBuyNow, loading = false }) => {
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        loading={loading}
        onClick={onAddToCart}
        className="flex-1"
      >
        Add to Cart
      </Button>

      <Button type="button" onClick={onBuyNow} className="flex-1">
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
