import ApiHelper from "./ApiHelper";

const createOrder = (data) => {
  return ApiHelper.post("/order-create/", data);
};
const getOrders = () => {
  return ApiHelper.get("/my-orders/");
};
const getOrderById = (id) => {
  return ApiHelper.get(`/order-create/${id}/`);
};

const updateOrder = (id, data) => {
  return ApiHelper.patch(`/order-create/${id}/`, data);
};

const deleteOrder = (id) => {
  return ApiHelper.delete(`/order-create/${id}/`);
};

const orderDetails = (id) => {
  return ApiHelper.get(`/orders/${id}/`);
};

export {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
  deleteOrder,
  orderDetails,
};
