import React from "react";
import { useState } from "react";

const ProductImageGallery = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-[#43e77f] bg-black/20">
        <img
          src={activeImage}
          alt="product"
          className="h-[420px] w-full object-contain p-6"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveImage(img)}
            className="overflow-hidden rounded-2xl border border-[#43e77f] bg-black/20"
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              className="h-20 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
