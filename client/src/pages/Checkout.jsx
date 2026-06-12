import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import getCheckoutItemImage from "../utils/getCheckoutItemImage";
import { createOrder } from "../api/orderService";
import { handleApiError } from "../api/errorHandler";
import { getAddresses } from "../api/addressService";
import CheckoutAddressSection from "./CheckoutAddressSection";
import { applyPromoCodePost } from "../api/cartService";
import { applyBuyNowPromoCode, createBuyNowOrder } from "../api/buyNowService";

const paymentOptions = [
  { id: "credit-card", label: "Credit Card" },
  { id: "UPI", label: "UPI" },
  { id: "google-pay", label: "Google Pay" },
  { id: "cod", label: "Cash on Delivery" },
];

const Checkout = () => {
  const { cartData, loading: cartLoading } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const buyNowItem = location.state?.buyNowItem;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("UPI");
  const [promoCode, setPromoCode] = useState("");
  const [promoSummary, setPromoSummary] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const checkoutItems = buyNowItem
    ? [buyNowItem]
    : Array.isArray(cartData?.items)
      ? cartData.items
      : [];
  const isBuyNow = !!buyNowItem;

  // const subtotal = promoSummary?.cart_total || cartData?.["total price"] || 0;
  const subtotal = isBuyNow
    ? promoSummary?.product_price ||
      Number(buyNowItem?.product?.price || 0) *
        Number(buyNowItem?.quantity || 1)
    : promoSummary?.cart_total || cartData?.["total price"] || 0;
  const deliveryCharge = subtotal > 0 ? 100 : 0;

  const discount = promoSummary?.discount || 0;

  // const total = promoSummary?.final_total || cartData?.["total price"] || 0;
  const total = isBuyNow
    ? promoSummary?.final_total || subtotal - discount + deliveryCharge
    : promoSummary?.final_total || cartData?.["total price"] || 0;

  //select address
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getAddresses();
        console.log("address response:", res.data);

        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.results)
            ? res.data.results
            : Array.isArray(res.data?.data)
              ? res.data.data
              : [];

        setAddresses(list);

        if (list.length > 0) {
          setSelectedAddressId(list[0].id);
        }
      } catch (error) {
        console.log("address error:", error.response?.data);
        handleApiError(error);
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      if (!selectedAddressId) {
        toast.error("Please select an address");
        return;
      }

      if (!selectedPayment) {
        toast.error("Please select payment method");
        return;
      }

      if (!checkoutItems.length) {
        toast.error("No items found");
        return;
      }

      let res;

      // BUY NOW FLOW
      if (buyNowItem) {
        console.log("promoSummary:", promoSummary);
        const payload = {
          product_id: buyNowItem.product.id,
          quantity: buyNowItem.quantity,
          address_id: selectedAddressId,
          payment_method: selectedPayment,

          // Send directly
          //promo_code: promoCode || null,
          promo_code: promoSummary?.promo_id || null,
          // ...(promoCode && {
          //   promo_code: promoCode,
          // }),
        };

        console.log("buy now payload:", payload);

        res = await createBuyNowOrder(payload);
        console.log("buy now response:", res.data);
      }

      // CART FLOW
      else {
        const payload = {
          address: selectedAddressId,
          address_id: selectedAddressId,
          total_amount: total,
          payment_method: selectedPayment,
          discount: promoSummary?.discount || 0,
          promo_code_id: promoSummary?.promo_id
            ? Number(promoSummary.promo_id)
            : null,

          user: user?.id,
        };

        console.log("cart payload:", payload);

        res = await createOrder(payload);
      }

      console.log("order created:", res.data);

      toast.success("Order placed successfully");

      navigate("/myorders");
      // const payload = {
      //   address: selectedAddressId,
      //   total_amount: total,
      //   payment_method: selectedPayment,
      //   discount: promoSummary?.discount || 0,
      //   promo_code_id: promoSummary?.promo_id
      //     ? Number(promoSummary.promo_id)
      //     : null,
      //   user: user?.id,
      //   address_id: selectedAddressId,
      // };
      // console.log("order payload:", payload);
      // console.log("promoSummary", promoSummary.promo_code);
      // console.log("promoSummary:", promoSummary);
      // console.log("total:", total);
      // console.log("payload:", payload);
      // const res = await createOrder(payload);
      // console.log("order created:", res.data);
      // toast.success("Order placed successfully");
      // navigate("/myorders");
    } catch (error) {
      console.log("order error:", error.response?.data);
      handleApiError(error);
    }
  };

  //prmomo code
  const handleApplyPromoCode = async () => {
    // try {
    //   if (!promoCode.trim()) {
    //     toast.error("Please enter promo code");
    //     return;
    //   }

    //   const cartId = cartData?.cart_id;

    //   if (!cartId) {
    //     toast.error("Cart ID not found");
    //     console.log("cartData:", cartData);
    //     return;
    //   }

    //   setPromoLoading(true);

    //   const res = await applyPromoCodePost(cartId, {
    //     promo_code: promoCode,
    //   });

    //   console.log("apply promo response:", res.data);
    //   const data = res.data.data || res.data; // important fallback
    //   setPromoSummary(data);
    //   // Clear textbox

    //   setPromoCode(data.promo_code || promoCode);

    //   toast.success("Promo applied successfully");
    try {
      if (!promoCode.trim()) {
        toast.error("Please enter promo code");
        return;
      }

      setPromoLoading(true);

      let res;

      if (buyNowItem) {
        res = await applyBuyNowPromoCode({
          product_id: buyNowItem.product.id,
          promo_code: Number(promoCode),
        });
      } else {
        res = await applyPromoCodePost(cartData?.cart_id, {
          promo_code: promoCode,
        });
      }

      const data = res.data.data || res.data;

      setPromoSummary(data);

      toast.success("Promo applied successfully");
    } catch (error) {
      toast.success("Invalid PromoCode..");
      console.log("promo error:", error.response?.data);
      handleApiError(error);
    } finally {
      setPromoLoading(false);
    }
  };
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
        <div className="mx-auto max-w-7xl">Loading checkout...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <div className="h-[2px] w-full bg-white/20 mb-6" />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Ship To */}
            <CheckoutAddressSection
              addresses={addresses}
              setAddresses={setAddresses}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={setSelectedAddressId}
            />

            {/* Payment Method */}
            <div className="rounded-3xl bg-white/10 p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>

              <div className="space-y-3">
                {paymentOptions.map((method) => {
                  const active = selectedPayment === method.id;

                  return (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${
                        active
                          ? "border-[#43e77f] bg-white/10"
                          : "border-white/20 bg-white/5"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={active}
                        onChange={() => setSelectedPayment(method.id)}
                        className="accent-[#43e77f]"
                      />
                      <span className="text-white font-medium">
                        {method.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-3xl bg-white/10 p-6 shadow-lg lg:sticky lg:top-6 h-fit">
            <div className="mb-5 flex items-center gap-3 rounded-full border-2 border-[#43e77f] px-4 py-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="w-full bg-transparent outline-none text-white"
              />

              <Button
                type="button"
                onClick={handleApplyPromoCode}
                disabled={promoLoading}
              >
                {promoLoading ? "Applying..." : "Apply"}
              </Button>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            {checkoutItems.length > 0 ? (
              <div className="space-y-4">
                {checkoutItems.map((item) => {
                  // console.log("checkout item:", checkoutItems[0]);
                  // console.log(
                  //   "product_images:",
                  //   checkoutItems[0]?.product_image,
                  // );
                  const itemName =
                    item.product?.name || item.product_name || "Product";
                  const itemBrand = item.product?.brand || item.brand || "";
                  const itemPrice = Number(
                    item.product?.price || item.product_price || 0,
                  );
                  const itemQty = Number(item.quantity || 1);
                  const itemSize = item.size || item.product_size || "";
                  const itemColor = item.color || item.product_color || "";
                  const imageSrc = getCheckoutItemImage(item);

                  return (
                    <div
                      key={item.id || item.product?.id}
                      className="flex gap-4 rounded-2xl bg-white/5 p-4"
                    >
                      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/5">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={itemName}
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <div className="text-white/50 text-xs">No image</div>
                        )}
                      </div>

                      <div className="flex-1 items-center ">
                        <h3 className="text-lg font-semibold">{itemName}</h3>
                        {itemBrand && (
                          <p className="text-white/70">{itemBrand}</p>
                        )}
                        {itemSize && (
                          <p className="text-white/70">Size: {itemSize}</p>
                        )}
                        {itemColor && (
                          //<p className="text-white/70">Color: {itemColor}</p>
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-white/70">Color:</span>

                            <div
                              className="h-5 w-5 rounded-full border border-white/30"
                              style={{ backgroundColor: itemColor }}
                            />

                            {/* <span>{itemColor}</span> */}
                          </div>
                        )}
                        <p className="text-white/70">Qty: {itemQty}</p>
                        <p className="mt-2 font-semibold">
                          ₹ {itemPrice * itemQty}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹ {deliveryCharge}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>₹ {discount}</span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹ {total}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="mt-4 w-full rounded-2xl bg-[#43e77f] px-5 py-3 font-semibold text-black transition hover:opacity-90"
                >
                  Place Order
                </button>
              </div>
            ) : (
              <p className="text-white/70">No items to checkout.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const Input = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
      />
    </div>
  );
};

export default Checkout;
