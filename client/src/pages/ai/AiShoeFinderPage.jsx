import React from "react";
import heroShoes from "../../assets/heroshoes.png";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const AiShoeFinderPage = () => {
  const navigate = useNavigate();

  const handleScanShoe = () => {
    navigate("/ai-finder/preferences");
  };
  return (
    <div className="min-h-screen bg-gradient-layout-main text-white px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-bold leading-tight">AI Shoe Finder</h1>

            <p className="text-xl text-[#43e77f]">
              Find the perfect shoe instantly.
            </p>

            <p className="text-gray-300 leading-8 text-lg">
              Upload a shoe image or scan one using your camera. Our AI will
              analyze the shoe and help you discover similar products available
              in our store.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button type="button" onClick={handleScanShoe}>
                📷 Scan Shoe
              </Button>

              <Button type="button">🖼️ Upload Image</Button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  blur-3xl
                  opacity-30
                  bg-[#43e77f]
                "
              />

              <img
                src={heroShoes}
                alt="AI Shoe Finder"
                className="
                  relative
                  w-full
                  max-w-lg
                  object-contain
                  drop-shadow-2xl
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiShoeFinderPage;
