import ApiHelper from "./ApiHelper";

const createBuyNowOrder = (data) => {
  return ApiHelper.post("/buy-now/", data);
};

export { createBuyNowOrder };
