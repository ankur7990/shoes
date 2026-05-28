import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

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
  { id: "upi", label: "UPI" },
  { id: "google-pay", label: "Google Pay" },
  { id: "cod", label: "Cash on Delivery" },
];

const Checkout = () => {
  const location = useLocation();
  const { cartData, loading: cartLoading } = useCart();
  const { user } = useAuth();

  const buyNowItem = location.state?.buyNowItem;
  const checkoutItems = buyNowItem ? [buyNowItem] : cartData || [];

  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(
    initialAddresses[0]?.id,
  );
  const [editingAddress, setEditingAddress] = useState(initialAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState("upi");

  const [isEditclicked, setIsEditclicked] = useState(true);

  const BASE_URL = "http://192.168.0.178:8000";

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => {
      const price = Number(item.product?.price || item.product_price || 0);
      const qty = Number(item.quantity || 1);
      return sum + price * qty;
    }, 0);
  }, [checkoutItems]);

  const deliveryCharge = subtotal > 0 ? 100 : 0;
  const discount = 0;
  const total = subtotal + deliveryCharge - discount;

  const getItemImage = (item) => {
    // Buy Now item shape
    if (item?.product?.product_images) {
      const images = item.product.product_images;

      // object keyed by color
      if (!Array.isArray(images) && item.color) {
        const colorImages = images[item.color];
        if (Array.isArray(colorImages) && colorImages.length > 0) {
          return colorImages[0];
        }
      }

      // fallback array shape
      if (Array.isArray(images) && images.length > 0) {
        return images[0].image || images[0];
      }
    }

    // Cart item shape
    if (item?.product_images?.length > 0) {
      const firstImage = item.product_images[0];

      if (typeof firstImage === "string") {
        return firstImage.startsWith("http")
          ? firstImage
          : `${BASE_URL}${firstImage}`;
      }

      if (firstImage?.image) {
        return firstImage.image.startsWith("http")
          ? firstImage.image
          : `${BASE_URL}${firstImage.image}`;
      }
    }

    return "/placeholder.png";
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-layout-main text-white p-10">
        Loading checkout...
      </div>
    );
  }

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    setEditingAddress(address);
  };

  const handleSelectAddressClick = (address) => {
    console.log("handleSelectAddressClick");

    setSelectedAddressId(address.id);
    setEditingAddress(address);
    setIsEditclicked(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setAddresses(
      (prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? editingAddress : addr,
        ),
      setIsEditclicked(true),
    );
  };

  const handlePlaceOrder = () => {
    console.log("Order Placed");
    console.log("Payment method selected", selectedPayment);
    console.log("Address selected", selectedAddressId);
  };

  return (
    <div className="min-h-screen bg-gradient-layout-main text-white px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <div className="h-[2px] w-full bg-white/20 mb-6" />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Ship To */}
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Ship To</h2>
              {/* your address list here */}
              <div className="space-y-4">
                {addresses.map((address) => {
                  const active = selectedAddressId === address.id;

                  return (
                    <div
                      key={address.id}
                      className={`rounded-2xl border p-4 transition-all cursor-pointer ${
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
                                handleSelectAddress(address);
                                handleSelectAddressClick(address);
                                setIsEditclicked(false);
                              }}
                              className="text-sm text-[#43e77f] hover:underline "
                            >
                              Edit
                            </button>
                          </div>

                          <p className="text-sm text-white/80 mt-2">
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

            {/* Payment Method */}
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 shadow-lg">
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

          {/* /////////////////////////////////////////////////// */}
          {isEditclicked ? (
            /* --- EDIT ADDRESS SECTION --- */
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

              {checkoutItems.length > 0 ? (
                <div className="space-y-4">
                  {checkoutItems.map((item) => {
                    const itemName =
                      item.product?.name || item.product_name || "Product";
                    const itemBrand = item.product?.brand || item.brand || "";
                    const itemPrice = Number(
                      item.product?.price || item.product_price || 0,
                    );
                    const itemQty = Number(item.quantity || 1);
                    const itemSize = item.size || item.product_size || "";
                    const itemColor = item.color || item.product_color || "";

                    return (
                      <div
                        key={item.id || item.product?.id}
                        className="flex gap-4 rounded-2xl bg-white/5 p-4"
                      >
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/5">
                          <img
                            src={getItemImage(item)}
                            alt={itemName}
                            className="h-full w-full object-contain p-2"
                          />
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
                </div>
              ) : (
                <p className="text-white/70">No items to checkout.</p>
              )}

              {/* <button
                className=""
                // className="mt-6 w-full rounded-2xl bg-[#43e77f] px-5 py-3 font-semibold text-black"
                
                onClick={handlePlaceOrder}
              >
                Place Order
              </button> */}
              <Button
                fullWidth
                type="submit"
                className="mt-5"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          ) : (
            /* --- ORDER SUMMARY SECTION --- */
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Edit Address Details
              </h2>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={editingAddress?.fullName || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Mobile Number"
                  name="mobile"
                  value={editingAddress?.mobile || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Street Area"
                  name="street"
                  value={editingAddress?.street || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Society / Apartment Name"
                  name="society"
                  value={editingAddress?.society || ""}
                  onChange={handleChange}
                />
                <Input
                  label="City"
                  name="city"
                  value={editingAddress?.city || ""}
                  onChange={handleChange}
                />
                <Input
                  label="State"
                  name="state"
                  value={editingAddress?.state || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Pin Code"
                  name="pinCode"
                  value={editingAddress?.pinCode || ""}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-[#43e77f] px-5 py-3 font-semibold text-black transition hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </div>
          )}
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
