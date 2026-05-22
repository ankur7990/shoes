import React from "react";
import Star from "../../components/common/Star";
// import { Star } from "lucide-react";

const ProductReview = ({ reviews = [] }) => {
  return (
    <div className="w-full rounded-3xl border border-[#43e77f] bg-black/20 p-5">
      <h2 className="mb-4 text-xl font-semibold text-white">Product Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-300">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={review.id || index}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-white">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold text-black">
                  <Star className="h-4 w-4 fill-black" />
                  <span>{review.rating}</span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReview;
