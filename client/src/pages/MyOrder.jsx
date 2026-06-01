import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orderService";
import { handleApiError } from "../api/errorHandler";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
        console.log("get ORders", res.data.data);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <h1>MyOrder</h1>
      <p>{}</p>
    </div>
  );
};

export default MyOrder;
