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
  console.log("post api called.");

  return ApiHelper.post(`/product-likes/`, data);
};

const deleteProductLikes = (id) => {
  return ApiHelper.delete(`/product-likes/${id}`);
};

const normalizeProductResponse = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};
export {
  getAllProducts,
  getProductsByCategory,
  getProductLikes,
  createProductLikes,
  deleteProductLikes,
  normalizeProductResponse,
};
