import ApiHelper from "./ApiHelper";

const createBuyNowOrder = (data) => {
  return ApiHelper.post("/buy-now/", data);
};

const applyBuyNowPromoCode = (data) => {
  return ApiHelper.post("/promo/apply/buy-now/", data);
};

export { createBuyNowOrder, applyBuyNowPromoCode };
