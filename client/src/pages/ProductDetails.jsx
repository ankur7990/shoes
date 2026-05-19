import React, { useState } from "react";
import ProductImageGallary from "../pages/Product/ProductImageGallery";
import ProductHeader from "../pages/Product/ProductHeader";
import SizeSelector from "../pages/Product/SizeSelector";
import ColorSelector from "../pages/Product/ColorSelector";
import ProductPrice from "../pages/Product/ProductPrice";
import DeliveryReturns from "../pages/Product/DeliveryReturns";
import ProductActions from "../pages/Product/ProductActions";
import ProductImageGallery from "../pages/Product/ProductImageGallery";
import ProductDescription from "../pages/Product/ProductDescription";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(40);
  const [selectedColor, setSelectedColor] = useState("Black");

  const product = {
    name: "Nike Air Zoom",
    price: 5999,
    description:
      "Premium running shoes with lightweight comfort and flexible sole.",
    deliveryText: "Delivery within 3-5 business days.",
    returnsText: "Easy 7-day return policy.",
    // images: [
    //   "/images/shoe1.png",
    //   "/images/shoe2.png",
    //   "/images/shoe3.png",
    //   "/images/shoe4.png",
    // ],
    colors: [
      { name: "Black", value: "#111111" },
      { name: "White", value: "#f5f5f5" },
      { name: "Blue", value: "#2563eb" },
    ],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
  };

  return (
    <div className="min-h-screen bg-gradient-layout-main text-white px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery images={product.images} />

          <div className="space-y-6">
            <ProductHeader name={product.name} />
            <ProductPrice price={product.price} />
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
            <ProductDescription text={product.description} />
            <DeliveryReturns
              deliveryText={product.deliveryText}
              returnsText={product.returnsText}
            />
            <ProductActions
              onAddToCart={() => console.log("Add to cart")}
              onBuyNow={() => console.log("Buy now")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
