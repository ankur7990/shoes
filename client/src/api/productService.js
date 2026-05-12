import ApiHelper from "./ApiHelper";

const getAllProducts = () => {
  return ApiHelper.get("/create/product/");
};
export default getAllProducts;
