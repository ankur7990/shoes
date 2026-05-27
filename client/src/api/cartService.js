import ApiHelper from "./ApiHelper";

const addToCart = (data) => {
  return ApiHelper.post("/cart/add/", data);
};

const getCartItems = () => {
  return ApiHelper.get("/cart/");
};

const updateCartItem = (id, data) => {
  return ApiHelper.patch(`/cart/update/${id}/`, data);
};

const removeCartItem = (id) => {
  return ApiHelper.delete(`/cart/remove/${id}/`);
};
export { addToCart, getCartItems, updateCartItem, removeCartItem };
