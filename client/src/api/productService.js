import ApiHelper from "./ApiHelper";

const getAllProducts = (data) => {
  return ApiHelper.get("/products/", data);
};
export default getAllProducts;
