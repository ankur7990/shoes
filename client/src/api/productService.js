import ApiHelper from "./ApiHelper";

const getAllProducts = (data) => {
  return ApiHelper.get("/products/", data);
};

const getProductsByCategory = (categoryId) => {
  return ApiHelper.get(`/category/filter/?category=${categoryId}`);
  //  return ApiHelper.get(`/products/?category=${categoryId}`);
};
export { getAllProducts, getProductsByCategory };
