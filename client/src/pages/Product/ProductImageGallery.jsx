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
        {images.map((img) => (
          <button
            key={img}
            type="button"
            onClick={() => setSelectedImage(img)}
            // className="overflow-hidden rounded-2xl border border-[#43e77f] bg-black/20"
            className={`rounded-2xl border-2 p-2 transition-all ${
              selectedImage === img
                ? "border-white scale-105"
                : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`thumbnail`}
              // className="h-20 w-full object-cover"
              className="h-20 w-20 rounded-xl object-contain bg-white/10"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
