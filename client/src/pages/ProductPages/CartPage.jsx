import { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";
import { Heart } from "lucide-react";
import Button from "../../components/common/Button";
import QuantityDropdown from "../../components/common/QuantityDropdown";
import PromoCodeBox from "../../components/common/PromoCodeBox";
import CartSummaryBox from "../../components/common/CartSummaryBox";
import CartRightPanel from "../../components/common/CartRightPanel ";
import getProductImage from "../../utils/getProductImage";

const CartPage = () => {
  const { cartData, fetchCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    fetchCart();
    // console.log(cartData.items);
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading cart...</div>;
  }

  // return (
  //   <div className="flex min-h-screen bg-gradient-layout-main px-4 py-6 text-white ">
  //     {/* left panel  */}
  //     <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
  //       <div className="mx-auto max-w-5xl space-y-6 flex flex-col justify-center items-center">
  //         <h1 className="text-3xl font-bold">Your Cart</h1>
  //         {!cartData?.items?.length ? (
  //           <div className="rounded-3xl border border-[#43e77f] p-6">
  //             Cart is empty.
  //           </div>
  //         ) : (
  //           <div className=" flex flex-col gap-3  ">
  //             {cartData.items.map((item) => (
  //               <div
  //                 key={item.id}
  //                 className="flex items-center gap-20  rounded-2xl border border-[#43e77f] bg-black/20 p-5"
  //               >
  //                 {/* IMAGE */}
  //                 <div className="bg-amber-400">
  //                   <p>image </p>
  //                   <img
  //                     src={getProductImage(item)}
  //                     alt={item?.product?.name || "Product"}
  //                     className="w-24 h-24 object-cover rounded-xl"
  //                   />
  //                 </div>

  //                 {/* TEXT */}
  //                 <div className="space-y-2">
  //                   <div className=" text-left">
  //                     <h2 className="text-lg font-semibold">
  //                       {item.product_name}
  //                     </h2>
  //                     <p className="text-sm text-gray-300">
  //                       Product ID: {item.product}
  //                     </p>
  //                     <p className="text-sm text-gray-300">
  //                       Quantity: {item.quantity}
  //                     </p>
  //                   </div>
  //                   {/* LASTLINE */}
  //                   <div className="flex flex-row gap-5">
  //                     <Button>Price</Button>
  //                     {/* <Button>dwopdown</Button> */}

  //                     <QuantityDropdown
  //                       value={quantity}
  //                       onChange={(e) => setQuantity(Number(e.target.value))}
  //                     />
  //                     <Button>delete</Button>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         )}

  //         {/* <PromoCodeBox
  //         value={promoCode}
  //         onChange={(e) => setPromoCode(e.target.value)}
  //         onApply={() => console.log("Apply promo:", promoCode)}
  //       /> */}

  //         {/* <div className="space-y-6"> */}
  //         {/* cart items list */}
  //         {/* <CartSummaryBox
  //           subtotal={cartData?.["total price"] || 0}
  //           delivery={"Free"}
  //           total={cartData?.["total price"] || 0}
  //         /> */}
  //         {/* </div> */}
  //         {/* <div className="rounded-2xl border border-[#43e77f] bg-black/20 p-4">
  //         <p className="text-lg font-semibold">
  //           Total Price: {cartData?.["total price"] || 0}
  //         </p>
  //       </div> */}
  //       </div>

  //       {/* right panel */}
  //     </div>
  //     <div className="">
  //       <CartRightPanel
  //         subtotal={cartData?.["total price"] || 0}
  //         delivery={"Free"}
  //         // discount={discount}
  //         total={cartData?.["total price"] || 0}
  //         promoCode={promoCode}
  //         setPromoCode={setPromoCode}
  //         onApplyPromo={() => console.log("Apply promo:", promoCode)}
  //         onCheckout={() => console.log("Checkout")}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="text-3xl font-bold ">Your Cart</h1>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* LEFT: Cart Items */}
          <div className="space-y-6">
            {!cartData?.items?.length ? (
              <div className="rounded-3xl border border-[#43e77f] bg-black/20 p-6">
                Cart is empty.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {cartData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-3xl border border-[#43e77f] bg-black/20 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Left image + text */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/5">
                        <img
                          // src={getProductImage(item)}
                          src={item.product_images?.[0]?.image}
                          alt={item?.product_name || "Product"}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="">
                        <div className="space-y-1">
                          <h2 className="text-lg font-semibold">
                            {item.product_name}
                          </h2>
                          {/* <p className="text-sm text-gray-300">
                          Product ID: {item.product}
                        </p> */}
                          <p className="text-sm text-gray-300">
                            size: {item.product_size}
                          </p>
                        </div>
                        {/* button */}
                        <div className="space-x-1">
                          <Button type="button" className="px-4 py-2">
                            {item.product_price}
                          </Button>

                          <QuantityDropdown
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          />

                          <Button type="button" className="px-4 py-2">
                            Delete
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
          <div className="lg:sticky lg:top-6 h-fit">
            <CartRightPanel
              subtotal={cartData?.["total price"] || 0}
              delivery={"Free"}
              total={cartData?.["total price"] || 0}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              onApplyPromo={() => console.log("Apply promo:", promoCode)}
              onCheckout={() => console.log("Checkout")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
