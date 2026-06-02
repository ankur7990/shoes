import React, { useEffect, useState } from "react";
import { getOrders, orderDetails } from "../api/orderService";
import { handleApiError } from "../api/errorHandler";
import Shoes1 from "../assets/shoes1.png";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const itemName = "NIKE Shoes air max";
  const itemBrand = "Nike";
  const itemSize = "5";
  const itemColor = "red";
  const itemQty = 5;
  const itemPrice = 1200;
  const imageSrc = Shoes1;

  function getOrderDetail(id) {
    const getDetail = orderDetails(id);
    console.log("order detail called", getDetail);
  }
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
        getOrderDetail(res.data.id);
      } catch (error) {
        console.log("order error:", error.response?.data);
        handleApiError(error);
      }
    };

    fetchOrders();
  }, []);

  const handleClickDetails = async () => {
    console.log("handle clicked order click");
    getOrderDetail();
  };
  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto max-w-xl space-y-6">
        {" "}
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-white/20 p-5 shadow-lg backdrop-blur-md border-white border-1"
              >
                {/* <div className="mb-4 flex items-center justify-between ">
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                   <p className="text-sm text-white/70">
                    {new Date(order.created_at).toLocaleDateString("en-IN")}
                  </p> 
                </div> */}

                <div className="space-y-4">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/5">
                        {item.product_image ? (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <div className="text-xs text-white/50">No image</div>
                        )}
                      </div>

                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold ">
                          {item.product_name}
                        </h3>
                        <p className="text-white/70">Qty: {item.quantity}</p>
                        <p className="mt-2 font-semibold">
                          ₹ {item.product_price}
                        </p>
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-white/70">Delivered</p>
                        <p className="mt-2 font-semibold">
                          ₹ {item.product_price}
                        </p>
                        <p className="text-white/70">
                          Date:{" "}
                          {new Date(order.created_at).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  {/* <button className="bg-green-700 "></button> */}
                  <button
                    class="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-full mx-auto max-w-xl "
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/70">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
