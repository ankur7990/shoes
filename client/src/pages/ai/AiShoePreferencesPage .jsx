import Button from "../../components/common/Button";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/common/Dropdown";
import AiCategorySelector from "./AiCategorySelector";
import AiBrandSelector from "./AiBrandSelector";
import { useRef } from "react";

const AiShoePreferencesPage = () => {
  const navigate = useNavigate();
  const cameraInputRef = useRef(null);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(5000);
  const [size, setSize] = useState("");

  const [error, setError] = useState("");

  const validateForm = () => {
    if (!category) return "Please select a category";
    if (!brand) return "Please select a brand";
    if (!size) return "Please select a shoe size";

    return "";
  };

  const handleTakePhoto = () => {
    console.log("Take Photo");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    cameraInputRef.current?.click();

    // document.getElementById("cameraInput").click();
  };

  // const handleUploadImage = () => {
  //   const validationError = validateForm();

  //   if (validationError) {
  //     setError(validationError);
  //     return;
  //   }

  //   setError("");

  //   document.getElementById("galleryInput").click();
  // };

  const handleImageSelected = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const aiRequestData = {
      category,
      brand,
      maxPrice: price,
      size,
      image: file,
    };

    console.log("AI Request Data:", aiRequestData);

    navigate("/ai-preview", {
      state: aiRequestData,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-layout-main text-white px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">AI Shoe Finder</h1>

          <p className="mt-3 text-gray-300">
            Tell us what you're looking for before uploading your shoe image.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border-2 border-[#43e77f] p-6">
          <div className="space-y-6">
            {/* Category */}
            <AiCategorySelector
              value={category}
              onChange={setCategory}
              options={[
                {
                  label: "Sports",
                  value: "sports",
                },
                {
                  label: "Sneakers",
                  value: "sneakers",
                },
                {
                  label: "Running",
                  value: "running",
                },
                {
                  label: "Casual",
                  value: "casual",
                },
                {
                  label: "Sandals",
                  value: "sandals",
                },
              ]}
            />

            {/* Price Range */}
            <div>
              <div className="mb-3 flex justify-between">
                <label className="font-medium">Max Budget</label>

                <span className="text-[#43e77f]">₹ {price}</span>
              </div>

              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="
                  w-full
                  accent-[#43e77f]
                  cursor-pointer
                "
              />
            </div>

            {/* Brand */}

            <AiBrandSelector
              value={brand}
              onChange={setBrand}
              options={[
                {
                  label: "Nike",
                  value: "nike",
                },
                {
                  label: "Adidas",
                  value: "adidas",
                },
                {
                  label: "Puma",
                  value: "puma",
                },
                {
                  label: "Reebok",
                  value: "reebok",
                },
                {
                  label: "Woodland",
                  value: "woodland",
                },
              ]}
            />
            {/* Shoe Size */}
            <div>
              <label className="mb-3 block font-medium">Select Size</label>
              <div className="flex flex-wrap gap-3">
                {[5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`
                        h-12 w-12 rounded-full border
                        transition-all duration-200
                        ${
                          size === item
                            ? "bg-[#43e77f] text-black border-[#43e77f]"
                            : "border-[#43e77f] text-white"
                        }
                      `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && <div className="text-red-400">{error}</div>}

            {/* Action Buttons */}
            <div className="grid gap-4 md:grid-cols-1">
              <Button type="button" onClick={handleTakePhoto}>
                📷 Take Photo
              </Button>

              {/* <Button type="button" onClick={handleUploadImage}>
                🖼 Upload Image
              </Button> */}
            </div>

            <div>
              <p>{category}</p>

              <p>{price}</p>
              <p>{brand}</p>
              <p>{size}</p>
            </div>
          </div>
        </div>

        {/* Camera Input */}
        <input
          ref={cameraInputRef}
          id="cameraInput"
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={handleImageSelected}
        />

        {/* Gallery Input */}
        <input
          id="galleryInput"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageSelected}
        />
      </div>
    </div>
  );
};

export default AiShoePreferencesPage;
