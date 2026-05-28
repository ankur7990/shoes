import React from "react";
import Button from "../common/Button";

const CartRightPanel = ({
  subtotal = 0,
  delivery = 0,
  discount = 0,
  total = 0,
  promoCode = "",
  setPromoCode,
  onApplyPromo,
  onCheckout,
  promoLoading = false,
  className = "",
}) => {
  return (
    <div
      className={`
        w-full rounded-3xl border-2 border-[#43e77f]
        bg-transparent p-5 text-white
        ${className}
      `}
    >
      <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>

      {/* Promo Code Box */}
      <div className="mb-5 flex items-center gap-3 rounded-full border-2 border-[#43e77f] px-4 py-2">
        <span className="text-[#43e77f] text-lg">🏷️</span>

        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode?.(e.target.value)}
          placeholder="Enter promo code"
          className="w-full bg-transparent outline-none text-white placeholder:text-gray-400"
        />

        <Button
          type="button"
          onClick={onApplyPromo}
          disabled={promoLoading}
          className="px-4 py-2"
        >
          {promoLoading ? "Applying..." : "Apply"}
        </Button>

        {discount > 0 && (
          <p className="mb-4 text-sm text-[#43e77f]">
            Promo applied successfully
          </p>
        )}
      </div>

      {/* Summary Rows */}
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl border border-[#43e77f]/30 px-4 py-3">
          <span className="text-sm text-gray-300">Subtotal</span>
          <span className="text-sm font-semibold">₹{subtotal}</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#43e77f]/30 px-4 py-3">
          <span className="text-sm text-gray-300">Delivery</span>
          <span className="text-sm font-semibold">₹{delivery}</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#43e77f]/30 px-4 py-3">
          <span className="text-sm text-gray-300">Discount</span>
          <span className="text-sm font-semibold">-₹{discount}</span>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-[#43e77f] px-4 py-3">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-semibold">₹{total}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6">
        <Button type="button" onClick={onCheckout} fullWidth>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartRightPanel;
