import { Package, Palette, Ruler, IndianRupee, Receipt } from "lucide-react";

const OrderSummaryCard = ({
  itemName,
  imageSrc,
  size,
  color,
  qty,
  price,
  subtotal,
  discount,
  total,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-white shadow-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order Summary</h2>

        <div className="rounded-full bg-[#43e77f]/20 px-4 py-2 text-sm font-medium text-[#43e77f]">
          Confirmed
        </div>
      </div>

      {/* Product */}
      <div className="flex flex-col gap-5 rounded-3xl bg-white/5 p-5 lg:flex-row">
        {/* Image */}
        <div className="h-40 w-40 overflow-hidden rounded-3xl bg-white">
          <img
            src={imageSrc}
            alt={itemName}
            className="h-full w-full object-contain p-3"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="mb-4 text-3xl font-bold">{itemName}</h3>

          <div className="grid gap-3 md:grid-cols-2">
            {/* Size */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <div className="rounded-xl bg-[#43e77f]/20 p-3">
                <Ruler size={18} />
              </div>

              <div>
                <p className="text-sm text-white/60">Size</p>
                <p className="font-semibold">{size}</p>
              </div>
            </div>

            {/* Color */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <div className="rounded-xl bg-purple-500/20 p-3">
                <Palette size={18} />
              </div>

              <div>
                <p className="text-sm text-white/60">Color</p>

                <div className="mt-1 flex items-center gap-2">
                  <div
                    className="h-5 w-5 rounded-full border border-white/30"
                    style={{ backgroundColor: color }}
                  />

                  <span className="text-sm">{color}</span>
                </div>
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <div className="rounded-xl bg-yellow-500/20 p-3">
                <Package size={18} />
              </div>

              <div>
                <p className="text-sm text-white/60">Quantity</p>
                <p className="font-semibold">{qty}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <div className="rounded-xl bg-blue-500/20 p-3">
                <IndianRupee size={18} />
              </div>

              <div>
                <p className="text-sm text-white/60">Price</p>
                <p className="font-semibold">₹{price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-white/70">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/70">Delivery</span>
          <span className="text-green-400">FREE</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/70">Discount</span>
          <span className="text-red-400">- ₹{discount}</span>
        </div>

        {/* Total */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#43e77f]/30 bg-[#43e77f]/10 p-5">
          <div className="flex items-center gap-3">
            <Receipt className="text-[#43e77f]" />

            <span className="text-lg font-semibold">Total Amount</span>
          </div>

          <span className="text-3xl font-bold text-[#43e77f]">₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
