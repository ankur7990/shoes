import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleApiError } from "../../api/errorHandler";
import { scanStyle } from "../../api/aiService";

const AiPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { image, categoryId, brand, size, minPrice, maxPrice } = location.state;

  const imagePreview = image ? URL.createObjectURL(image) : null;

  useEffect(() => {
    if (!image) return;

    handleAnalyzeStyle();
  }, []);

  const handleAnalyzeStyle = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);
      // formData.append("category_id", categoryId);
      // formData.append("size", size);
      // formData.append("company_name", brand);
      // formData.append("min_price", minPrice);
      // formData.append("max_price", maxPrice);
      if (categoryId) {
        formData.append("category_id", categoryId);
      }

      if (brand) {
        formData.append("company_name", brand);
      }

      if (size) {
        formData.append("size", size);
      }

      if (minPrice) {
        formData.append("min_price", minPrice);
      }

      if (maxPrice) {
        formData.append("max_price", maxPrice);
      }

      console.log({
        categoryId,
        brand,
        size,
        minPrice,
        maxPrice,
      });
      const res = await scanStyle(formData);

      console.log("AI Result:", res.data);

      navigate("/ai-results", {
        state: {
          products: res.data,
        },
      });
    } catch (error) {
      console.log(error.response?.data);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Analyzing Your Style
        </h1>

        {imagePreview && (
          // <img
          //   src={imagePreview}
          //   alt="Selected"
          //   className="mb-6 h-80 w-full rounded-3xl object-cover"
          // />

          <div className="flex justify-center">
            <div
              className="
      relative
      w-72
      overflow-hidden
      rounded-3xl
      border-2 border-[#43e77f]
      bg-black/20
      p-4
      shadow-[0_0_25px_rgba(67,231,127,0.25)]
      backdrop-blur-sm
    "
            >
              {/* AI Badge */}
              <div
                className="
        absolute
        left-4
        top-4
        z-20
        rounded-full
        bg-[#43e77f]
        px-3
        py-1
        text-xs
        font-bold
        text-black
      "
              >
                AI SCAN
              </div>

              {/* Version */}
              <div
                className="
        absolute
        right-4
        top-4
        z-20
        text-xs
        font-bold
        text-[#43e77f]
      "
              >
                V2.0
              </div>

              {/* Image Container */}
              <div className="relative mt-10 overflow-hidden rounded-2xl">
                <img
                  src={imagePreview}
                  alt="Selected Shoe"
                  className="
          h-80
          w-full
          object-cover
        "
                />

                {/* Scan Line */}
                <div
                  className="
          absolute
          left-0
          right-0
          top-1/2
          h-[2px]
          bg-[#43e77f]
          opacity-90
          animate-pulse
        "
                />

                {/* Corner Scanner Marks */}
                <div className="absolute left-2 top-2 h-8 w-8 border-l-2 border-t-2 border-[#43e77f]" />
                <div className="absolute right-2 top-2 h-8 w-8 border-r-2 border-t-2 border-[#43e77f]" />
                <div className="absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 border-[#43e77f]" />
                <div className="absolute bottom-2 right-2 h-8 w-8 border-b-2 border-r-2 border-[#43e77f]" />
              </div>

              {/* Footer */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white">
                  {/* Shoe Detected  */} Finding Perfect Match
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-400">Ready for AI Analysis</p>

                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#43e77f] animate-pulse" />

                    <span className="text-xs text-[#43e77f]">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <br />
        <div className="rounded-3xl bg-white/10 p-6 text-center">
          <div className="mb-4 text-5xl">👟</div>

          <h2 className="mb-2 text-xl font-semibold">
            Finding Your Perfect Match
          </h2>

          <p className="text-white/70">Our AI is analyzing your style...</p>

          {loading && (
            <div className="mt-6">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#43e77f] border-t-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiPreview;
