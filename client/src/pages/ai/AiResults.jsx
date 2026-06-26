import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Brain, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import Button from "../../components/common/Button";

const AiResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const aiResult = location.state?.products;

  const imageSummary = aiResult?.image_summary;
  const recommendationReason = aiResult?.recommendation_reason;

  const products = aiResult?.recommended_products || [];
  const [showAnalysis, setShowAnalysis] = useState(false);

  console.log("location.state", location.state);

  return (
    <div className="bg-gradient-layout-main min-h-screen px-4 py-6 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-[#43e77f]/20 px-4 py-2 text-[#43e77f]">
            <Sparkles size={18} className="mr-2" />
            AI Powered Recommendations
          </div>

          <h1 className="text-4xl font-bold">
            We Found {products.length} Perfect Matches
          </h1>

          <p className="mt-2 text-white/70">
            Based on your uploaded style and preferences.
          </p>
        </div>

        {/* AI Analysis */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mb-4 flex items-center gap-3">
            <Brain className="text-[#43e77f]" />
            <h2 className="text-xl font-semibold">Outfit Analysis</h2>
          </div>

          <p className="leading-relaxed text-white/80">{imageSummary}</p>
        </div>

        {/* Recommendation */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="text-[#43e77f]" />
            <h2 className="text-xl font-semibold">Why These Shoes?</h2>
          </div>

          <p className="leading-relaxed text-white/80">
            {recommendationReason}
          </p>
        </div>

        {/* Product Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recommended Products</h2>

          <div className="rounded-full border border-[#43e77f] px-4 py-2 text-sm text-[#43e77f]">
            {products.length} Matches Found
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">Recommended Shoes</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const colorKey = Object.keys(product.product_images || {})[0];

              const imageUrl = product.product_images?.[colorKey]?.[0];
              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md transition-all hover:border-[#43e77f]"
                >
                  <div className="h-72 bg-white">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain p-4"
                    />
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-[#43e77f]/20 px-3 py-1 text-xs text-[#43e77f]">
                        AI Match
                      </span>

                      <div
                        className="h-5 w-5 rounded-full border"
                        style={{
                          backgroundColor: colorKey,
                        }}
                      />
                    </div>

                    <h3 className="text-lg font-semibold">{product.name}</h3>

                    <p className="text-white/60">{product.brand}</p>

                    <p className="mt-3 text-xl font-bold text-[#43e77f]">
                      ₹ {product.price}
                    </p>

                    <Button onClick={() => navigate(`/product/${product.id}`)}>
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {/* {!products.length && (
          <div className="rounded-3xl bg-white/10 p-10 text-center">
            <h3 className="mb-2 text-xl font-semibold">
              No Recommendations Found
            </h3>

            <p className="text-white/70">
              Try another image or adjust your preferences.
            </p>
          </div>
        )} */}
        {!products.length && (
          <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-white/10 p-8 text-center">
            <div className="mb-4 text-6xl">😔</div>

            <h2 className="mb-3 text-2xl font-bold">
              No Recommendations Found
            </h2>

            <p className="mb-6 text-white/70">
              We couldn't find any matching shoes. Try again with another image
              or preferences.
            </p>

            <Button
              type="button"
              onClick={() => navigate("/ai-finder")}
              className="px-6 py-3"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiResults;
