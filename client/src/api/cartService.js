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

const applyPromoCode = (data) => {
  return ApiHelper.post(`/promo/apply/`, data);
};

export const checkPromoCode = (cartId, promoCode) => {
  return ApiHelper.get("/cart/check-promo/", {
    params: {
      cart_id: cartId,
      promo_code: promoCode,
    },
  });
};

export {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  applyPromoCode,
};
