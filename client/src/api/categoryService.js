import ApiHelper from "./ApiHelper";

const getCategories = (data) => {
  return ApiHelper.get("/categories", data);
};

const getProductsByCategory = (categoryId) => {
  return ApiHelper.get(`/category/filter/?category=${categoryId}`);
  //  return ApiHelper.get(`/products/?category=${categoryId}`);
};
// export const getCategoryById = (id) => {
//   return ApiHelper.get(`/categories/${id}/`);
// };

export { getCategories, getProductsByCategory };
