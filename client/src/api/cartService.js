import ApiHelper from "./ApiHelper";

const addToCart = (data) => {
  return ApiHelper.post("/cart/add/", data);
};

const getCart = () => {
  return ApiHelper.get("/cart/");
};
export { addToCart, getCart };
