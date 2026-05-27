import { useState, useEffect } from "react";

const ProductImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  useEffect(() => {
    setSelectedImage(images[0] || "");
  }, [images]);
  if (!images.length) return null;

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE */}
      <div className="overflow-hidden rounded-3xl border border-[#43e77f] bg-black/20">
        <img
          src={selectedImage}
          alt="product"
          className="h-[420px] w-full object-contain p-6"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(img)}
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
