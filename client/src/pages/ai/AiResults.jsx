import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Brain, ArrowRight } from "lucide-react";

const AiResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const aiResult = location.state?.aiResult;

  const imageSummary = aiResult?.image_summary;
  const recommendationReason = aiResult?.recommendation_reason;

  const products = aiResult?.recommended_products || [];

  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-[#43e77f]/20 p-4">
              <Sparkles size={40} className="text-[#43e77f]" />
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold">AI Style Analysis</h1>

          <p className="text-white/70">
            We found {products.length} shoes that match your style.
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/10
                backdrop-blur-lg
                transition-all
                duration-300
                hover:border-[#43e77f]
                hover:shadow-[0_0_30px_rgba(67,231,127,0.15)]
              "
            >
              {/* Image */}
              <div className="h-72 overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    h-full
                    w-full
                    object-contain
                    p-4
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#43e77f]/20 px-3 py-1 text-xs text-[#43e77f]">
                    AI Recommended
                  </span>

                  <div
                    className="h-5 w-5 rounded-full border"
                    style={{
                      backgroundColor: product.color,
                    }}
                  />
                </div>

                <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>

                <p className="mb-3 text-white/60">{product.brand}</p>

                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xl font-bold text-[#43e77f]">
                    ₹ {product.price}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/productdetails/${product.id}`)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-[#43e77f]
                    py-3
                    font-semibold
                    text-black
                    transition
                    hover:opacity-90
                  "
                >
                  View Details
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!products.length && (
          <div className="rounded-3xl bg-white/10 p-10 text-center">
            <h3 className="mb-2 text-xl font-semibold">
              No Recommendations Found
            </h3>

            <p className="text-white/70">
              Try another image or adjust your preferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiResults;
