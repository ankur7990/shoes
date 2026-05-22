import ApiHelper from "./ApiHelper";

const addToCart = (data) => {
  return ApiHelper.get("/cart/add/", data);
};

export { addToCart };
