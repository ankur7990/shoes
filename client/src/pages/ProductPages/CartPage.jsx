import { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";
import { Heart } from "lucide-react";
import Button from "../../components/common/Button";
import QuantityDropdown from "../../components/common/QuantityDropdown";
import PromoCodeBox from "../../components/common/PromoCodeBox";
import CartSummaryBox from "../../components/common/CartSummaryBox";
import CartRightPanel from "../../components/common/CartRightPanel ";

const CartPage = () => {
  const { cartData, fetchCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading cart...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white ">
      {/* left panel  */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="mx-auto max-w-5xl space-y-6 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          {!cartData?.items?.length ? (
            <div className="rounded-3xl border border-[#43e77f] p-6">
              Cart is empty.
            </div>
          ) : (
            <div className="space-y- w-1/2 flex flex-col gap-3  ">
              {cartData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-20  rounded-2xl border border-[#43e77f] bg-black/20 p-5"
                >
                  {/* IMAGE */}
                  <div className="bg-amber-400">
                    <p>image </p>
                  </div>

                  {/* TEXT */}
                  <div className="space-y-2">
                    <div className=" text-left">
                      <h2 className="text-lg font-semibold">
                        {item.product_name}
                      </h2>
                      <p className="text-sm text-gray-300">
                        Product ID: {item.product}
                      </p>
                      <p className="text-sm text-gray-300">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    {/* LASTLINE */}
                    <div className="flex flex-row gap-5">
                      <Button>Price</Button>
                      {/* <Button>dwopdown</Button> */}

                      <QuantityDropdown
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      />
                      <Button>delete</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* <PromoCodeBox
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          onApply={() => console.log("Apply promo:", promoCode)}
        /> */}

          {/* <div className="space-y-6"> */}
          {/* cart items list */}
          {/* <CartSummaryBox
            subtotal={cartData?.["total price"] || 0}
            delivery={"Free"}
            total={cartData?.["total price"] || 0}
          /> */}
          {/* </div> */}
          {/* <div className="rounded-2xl border border-[#43e77f] bg-black/20 p-4">
          <p className="text-lg font-semibold">
            Total Price: {cartData?.["total price"] || 0}
          </p>
        </div> */}
        </div>

        {/* right panel */}

        <CartRightPanel
          subtotal={cartData?.["total price"] || 0}
          delivery={"Free"}
          // discount={discount}
          total={cartData?.["total price"] || 0}
          promoCode={promoCode}
          setPromoCode={setPromoCode}
          onApplyPromo={() => console.log("Apply promo:", promoCode)}
          onCheckout={() => console.log("Checkout")}
        />
      </div>
    </div>
  );
};

export default CartPage;
