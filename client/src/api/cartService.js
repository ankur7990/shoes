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
const applyPromoCodePost = (cartId, data) => {
  return ApiHelper.post("/promo/apply/", {
    cart_id: cartId,
    ...data,
  });
};

const checkPromoCodeGet = (cartId, promoCode) => {
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
  applyPromoCodePost,
  checkPromoCodeGet,
};
