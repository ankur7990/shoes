import ApiHelper from "./ApiHelper";

const getAllProducts = (data) => {
  return ApiHelper.get("/products/", data);
};

const getProductsByCategory = (categoryId) => {
  return ApiHelper.get(`/category/filter/?category=${categoryId}`);
  //  return ApiHelper.get(`/products/?category=${categoryId}`);
};

const getProductLikes = () => {
  return ApiHelper.get(`/product-likes/`);
};

const createProductLikes = (data) => {
  return ApiHelper.post(`/product-likes/`, data);
};
export {
  getAllProducts,
  getProductsByCategory,
  getProductLikes,
  createProductLikes,
};
