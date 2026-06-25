import { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";
import { Heart } from "lucide-react";
import Button from "../../components/common/Button";
import QuantityDropdown from "../../components/common/QuantityDropdown";
import PromoCodeBox from "../../components/common/PromoCodeBox";
import CartSummaryBox from "../../components/common/CartSummaryBox";
import CartRightPanel from "../../components/common/CartRightPanel ";
import getProductImage from "../../utils/getProductImage";
import {
  applyPromoCodePost,
  checkPromoCodeGet,
  removeCartItem,
  updateCartItem,
} from "../../api/cartService";
import toast from "react-hot-toast";
import { handleApiError } from "../../api/errorHandler";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // console.log("Add to cart clicked.");

  const { cartData, fetchCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [promoSummary, setPromoSummary] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const { fetchCartCount } = useCart();
  const navigate = useNavigate();
  const delivery = 0;
  // const subtotal = cartData?.["total price"] || 0;
  const cartId = cartData?.id;

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading cart...</div>;
  }

  //delete
  const handleDeleteCartItem = async (cartItemId) => {
    const confirmDelete = window.confirm("Remove this item from cart?");
    if (!confirmDelete) return;

    try {
      await removeCartItem(cartItemId);
      toast.success("Item removed from cart");
      await fetchCart();
      await fetchCartCount();
    } catch (error) {
      handleApiError(error);
    }
  };

  //select qty
  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      await updateCartItem(cartItemId, {
        quantity: Number(quantity),
      });

      toast.success("Quantity updated");

      await fetchCart();

      if (typeof fetchCartCount === "function") {
        await fetchCartCount();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto w-full max-w-7xl ">
        <h1 className="text-3xl font-bold ">Your Cart</h1>

        {/* <div className="flex gap-10"> */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Cart Items */}
          {/* <div className="space-y-6 "> */}
          <div className="flex-1 space-y-6">
            {!cartData?.items?.length ? (
              <div className="rounded-3xl border border-[#43e77f] bg-black/20 p-6">
                Cart is empty.
              </div>
            ) : (
              // <div className="grid gap-4 md:grid-cols-3   ">
              <div
                className="
    grid
    gap-6
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-2
  "
              >
                {cartData.items.map((item) => (
                  <div
                    key={item.id}
                    // className="flex flex-col gap-4 rounded-3xl border border-[#43e77f] bg-black/20 p-5 sm:flex-row sm:items-center sm:justify-between bg-amber-400 "
                    className="
rounded-3xl
border
border-[#43e77f]
bg-black/20
p-5
flex
flex-col
gap-5
transition-all
duration-300
"
                  >
                    {/* Left image + text */}
                    {/* <div className="flex items-center gap-4  "> */}
                    <div
                      className="
    flex
    flex-col
    items-center
    gap-4
    sm:flex-row
    sm:items-start
  "
                    >
                      <div
                        // className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white"
                        className="
flex
h-24
w-24
sm:h-28
sm:w-28
items-center
justify-center
rounded-2xl
bg-white
overflow-hidden
"
                      >
                        <img
                          src={item.product_image}
                          // src={getProductImage(item)}
                          alt={item?.product_name || "Product"}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <div className="space-y-1 text-left p-2">
                          <h2 className="text-lg sm:text-xl font-semibold">
                            {item.product_name.toUpperCase()}
                          </h2>
                          {/* <p className="text-sm text-gray-300">
                          Product ID: {item.product}
                        </p> */}
                          <p
                            className="text-base
sm:text-lg text-gray-300"
                          >
                            SIZE : {item.product_size.toUpperCase()}
                          </p>
                        </div>
                        {/* button */}
                        {/* <div className="flex gap-4"> */}
                        <div
                          className="
    mt-4
    flex
    flex-wrap
    justify-center
    gap-3
    sm:justify-start
  "
                        >
                          <Button type="button" className="px-4 py-2">
                            $ {item.product_price}
                          </Button>

                          <QuantityDropdown
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, e.target.value)
                            }
                          />

                          <Button
                            type="button"
                            className="px-4 py-2"
                            onClick={() => handleDeleteCartItem(item.id)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right actions */}
                    {/* <div className="flex items-center gap-3 sm:justify-end">
                      <Button type="button" className="px-4 py-2">
                        Price
                      </Button>

                      <QuantityDropdown
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />

                      <Button type="button" className="px-4 py-2">
                        Delete
                      </Button>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Summary Panel */}
          {/* <div className="lg:sticky lg:top-6 h-fit">
            <CartRightPanel
              subtotal={
                promoSummary?.cart_total || cartData?.["total price"] || 0
              }
              disabled={promoLoading}
              delivery={delivery}
              total={
                promoSummary?.final_total || cartData?.["total price"] || 0
              }
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              onApplyPromo={handleApplyPromoCode}
              // onCheckout={() => console.log("Checkout")}
              onCheckout={() =>
                navigate("/checkout/", {
                  state: {
                    promoSummary,
                  },
                })
              }
              promoLoading={promoLoading}
              discount={promoSummary?.discount || 0}
            />
          </div> */}
        </div>
        <br />
        {/* <div className="mx-auto w-full max-w-xl "> */}
        <div
          className="
    sticky
    bottom-0
    mt-8
    
    py-4
  "
        >
          <Button fullWidth onClick={() => navigate("/checkout")}>
            Proceed To Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
