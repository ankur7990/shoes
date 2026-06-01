import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orderService";
import { handleApiError } from "../api/errorHandler";
import Shoes1 from "../assets/shoes1.png";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const itemName = "NIKE Shoes air max";
  const itemBrand = "Nike";
  const itemSize = "5";
  const itemColor = "red";
  const itemQty = 5;
  const itemPrice = 1200;
  const imageSrc = Shoes1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        console.log("orders response:", res.data);

        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : Array.isArray(res.data?.results)
              ? res.data.results
              : [];
        setOrders(list);
      } catch (error) {
        console.log("order error:", error.response?.data);
        handleApiError(error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <h1>MyOrder {orders}</h1>
      {orders.map((item) => {
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
            {itemBrand && <p className="text-white/70">{itemBrand}</p>}
            {itemSize && <p className="text-white/70">Size: {itemSize}</p>}
            {itemColor && <p className="text-white/70">Color: {itemColor}</p>}
            <p className="text-white/70">Qty: {itemQty}</p>
            <p className="mt-2 font-semibold">₹ {itemPrice * itemQty}</p>
          </div>
        </div>;
      })}
    </div>
  );
};

export default MyOrder;
