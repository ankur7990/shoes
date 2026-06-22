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
          <img
            src={imagePreview}
            alt="Selected"
            className="mb-6 h-80 w-full rounded-3xl object-cover"
          />
        )}

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
