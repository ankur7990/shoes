import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import toast from "react-hot-toast";
import getCheckoutItemImage from "../utils/getCheckoutItemImage";
import { createOrder } from "../api/orderService";
import { handleApiError } from "../api/errorHandler";

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    fullName: "Ankur Patel",
    mobile: "9876543210",
    street: "12, Green Street",
    society: "Sunrise Society",
    city: "Rajkot",
    state: "Gujarat",
    pinCode: "360001",
  },
  {
    id: 2,
    label: "Office",
    fullName: "Ankur Patel",
    mobile: "9876543210",
    street: "45, Business Park",
    society: "Titan Plaza",
    city: "Rajkot",
    state: "Gujarat",
    pinCode: "360002",
  },
];
const paymentOptions = [
  { id: "credit-card", label: "Credit Card" },
  { id: "UPI", label: "UPI" },
  { id: "google-pay", label: "Google Pay" },
  { id: "cod", label: "Cash on Delivery" },
];

const Checkout = () => {
  const location = useLocation();
  const { cartData } = useCart();
  const navigate = useNavigate();

  const buyNowItem = location.state?.buyNowItem;

  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(
    initialAddresses[0]?.id,
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState("UPI");

  const checkoutItems = buyNowItem
    ? [buyNowItem]
    : Array.isArray(cartData?.items)
      ? cartData.items
      : [];

  // const subtotal = useMemo(() => {
  //   return checkoutItems.reduce((sum, item) => {
  //     const price = Number(item.product?.price || item.product_price || 0);
  //     const qty = Number(item.quantity || 1);
  //     return sum + price * qty;
  //   }, 0);
  // }, [checkoutItems]);

  const promoSummary = location.state?.promoSummary;
  const subtotal = promoSummary?.cart_total || cartData?.["total price"] || 0;

  const deliveryCharge = subtotal > 0 ? 100 : 0;
  const discount = promoSummary?.discount || 0;
  const total = promoSummary?.final_total || cartData?.["total price"] || 0;

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    console.log("selected address:", address);
  };

  const handleSaveAddress = () => {
    if (!editingAddress) return;

    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === editingAddress.id ? editingAddress : addr,
      ),
    );

    setSelectedAddressId(editingAddress.id);
    setIsEditOpen(false);
    setEditingAddress(null);
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setIsEditOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

      const payload = {
        address: selectedAddressId,
        total_amount: total,
        payment_method: selectedPayment,
        discount: promoSummary?.discount || 0,
        promo_code: promoSummary?.promo_code || "",
      };

      // console.log("order payload:", payload);

      const res = await createOrder(payload);

      console.log("order created:", res.data);

      toast.success("Order placed successfully");
      navigate("/myorders");
    } catch (error) {
      console.log("order error:", error.response?.data);
      handleApiError(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <div className="h-[2px] w-full bg-white/20 mb-6" />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Ship To */}
            <div className="rounded-3xl bg-white/10 p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Ship To</h2>

              <div className="space-y-4">
                {addresses.map((address) => {
                  const active = selectedAddressId === address.id;

                  return (
                    <div
                      key={address.id}
                      className={`rounded-2xl border p-4 cursor-pointer ${
                        active
                          ? "border-[#43e77f] bg-white/10"
                          : "border-white/20 bg-white/5"
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={active}
                          onChange={() => handleSelectAddress(address)}
                          className="mt-1 accent-[#43e77f]"
                        />

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-lg font-semibold">
                              {address.label}
                            </h3>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(address);
                              }}
                              className="text-sm text-[#43e77f] hover:underline"
                            >
                              Edit
                            </button>
                          </div>

                          <p className="mt-2 text-sm text-white/80">
                            {address.fullName}
                          </p>
                          <p className="text-sm text-white/80">
                            {address.mobile}
                          </p>
                          <p className="text-sm text-white/80">
                            {address.street}, {address.society}
                          </p>
                          <p className="text-sm text-white/80">
                            {address.city}, {address.state} - {address.pinCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Edit Address Modal */}
            {isEditOpen && editingAddress && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                <div className="w-full max-w-2xl rounded-3xl bg-[#111827] p-6 text-white shadow-2xl">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Edit Address</h2>
                    <button
                      type="button"
                      onClick={() => setIsEditOpen(false)}
                      className="text-white/70 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Full Name"
                      name="fullName"
                      value={editingAddress.fullName}
                      onChange={handleChange}
                    />
                    <Input
                      label="Mobile Number"
                      name="mobile"
                      value={editingAddress.mobile}
                      onChange={handleChange}
                    />
                    <Input
                      label="Street Area"
                      name="street"
                      value={editingAddress.street}
                      onChange={handleChange}
                    />
                    <Input
                      label="Society / Apartment Name"
                      name="society"
                      value={editingAddress.society}
                      onChange={handleChange}
                    />
                    <Input
                      label="City"
                      name="city"
                      value={editingAddress.city}
                      onChange={handleChange}
                    />
                    <Input
                      label="State"
                      name="state"
                      value={editingAddress.state}
                      onChange={handleChange}
                    />
                    <Input
                      label="Pin Code"
                      name="pinCode"
                      value={editingAddress.pinCode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditOpen(false)}
                      className="w-full rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveAddress}
                      className="w-full rounded-2xl bg-[#43e77f] px-5 py-3 font-semibold text-black transition hover:opacity-90"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

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

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{itemName}</h3>
                        {itemBrand && (
                          <p className="text-white/70">{itemBrand}</p>
                        )}
                        {itemSize && (
                          <p className="text-white/70">Size: {itemSize}</p>
                        )}
                        {itemColor && (
                          <p className="text-white/70">Color: {itemColor}</p>
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
