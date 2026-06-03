import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderDetails } from "../api/orderService";
import {
  Package,
  MapPin,
  CreditCard,
  Clock3,
  Download,
  PhoneCall,
  User,
  House,
  ShoppingCart,
} from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await orderDetails(id);
      console.log("order details:", res.data);
      setOrder(res.data);
    };

    if (id) fetchOrder();
  }, [id]);
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
        <div className="mx-auto max-w-6xl">Loading order details...</div>
      </div>
    );
  }

  const orderItem = order.items?.[0];

  return (
    <div className="min-h-screen bg-gradient-layout-main px-4 py-6 text-white">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Order Details</h1>

        {/* 1. ORDER ITEM CARD */}
        <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-md border-white border-1">
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
                  <p className="mt-2 font-semibold">₹ {item.product_price}</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-white/70">Delivered</p>
                  <p className="mt-2 font-semibold">₹ {item.product_price}</p>
                  <p className="text-white/70">
                    Date:{" "}
                    {new Date(order.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. DELIVERY ADDRESS */}
        <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-md border-white border-1">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#43e77f]" />
            <h2 className="text-xl font-semibold">Delivery Address</h2>
          </div>

          <div className="space-y-2 text-white/80 text-left">
            <div className="flex items-center gap-2 text-white ">
              <User className="h-4 w-4 text-[#43e77f]" />
              <span className="font-semibold">
                {order?.username || "Customer Name"}
              </span>
            </div>

            <div className=" flex flex-row gap-55 ">
              <div className=" ">
                <p>{order?.phone_number || "Mobile number"}</p>
                <p>{order?.address.street || "Street area"}</p>
                <p>{order?.address.area || "Street area"}</p>
                <p>
                  {order?.address.society_name || "Society"},{" "}
                  {order?.address.city || "City"},{" "}
                  {order?.address.state || "State"} -{" "}
                  {order?.address.pincode || "Pincode"}
                </p>
              </div>
              <div className="content-end ">
                <button class="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-5 rounded-full mx-auto max-w-xl ">
                  <div className="flex items-center justify-center gap-2">
                    <House className="h-4 w-4" />
                    {order?.address.address_type.toUpperCase()}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PAYMENT INFORMATION */}
        <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-md border-1 border-white">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#43e77f]" />
            <h2 className="text-xl font-semibold">Payment Information</h2>
          </div>

          <div className="space-y-3">
            <Row
              label="Item Price"
              value={`₹ ${orderItem?.product_price || order.total_amount}`}
            />
            <Row label="Delivery Charge" value="Free" />
            <Row
              label="Discount / Coupon"
              value={`₹ ${order.discount || "0.00"}`}
            />
            <div className="flex items-center justify-between rounded-2xl border border-[#43e77f] px-4 py-3">
              <span className="font-semibold">Total Amount</span>
              <span className="text-lg font-bold text-[#43e77f]">
                ₹ {order.total_amount}
              </span>
            </div>
          </div>
        </div>

        {/* <h2 className="text-xl font-semibold">Order Timeline</h2> */}
        {/* 4. ORDER TIMELINE */}
        <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-md border-1 border-white">
          <div className="mb-4 flex items-center justify-between">
            <div className="mb-4 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-[#43e77f]" />
              <h2 className="text-xl font-semibold">Order Timeline</h2>
            </div>
            <Clock3 className="h-5 w-5 text-[#43e77f]" />
          </div>

          <div className="space-y-5">
            <TimelineRow title="Order Placed" date={order.created_at} />
            <TimelineRow title="Order Confirmed" date="-" />
            <TimelineRow title="Order On Way" date="-" />
            <TimelineRow
              title="Out for Delivery"
              date={order.delivery_date}
              active
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="flex-1 rounded-2xl border border-[#43e77f] px-5 py-3 font-semibold text-[#43e77f] transition hover:bg-[#43e77f] hover:text-black">
            <div className="flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download Invoice
            </div>
          </button>

          <button className="flex-1 rounded-2xl bg-[#43e77f] px-5 py-3 font-semibold text-black transition hover:opacity-90">
            <div className="flex items-center justify-center gap-2">
              <PhoneCall className="h-4 w-4" />
              Contact Support
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/20 px-4 py-3">
      <span className="text-sm text-white/70">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
};

const TimelineRow = ({ title, date, active = false }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`h-4 w-4 rounded-full border-2 ${
            active
              ? "border-[#43e77f] bg-[#43e77f]"
              : "border-white/40 bg-transparent"
          }`}
        />
        <div className="mt-1 h-full w-[2px] grow bg-white/20" />
      </div>

      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-medium">{title}</p>
          <span className="text-sm text-white/60">
            {date !== "-" ? new Date(date).toLocaleDateString("en-IN") : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
