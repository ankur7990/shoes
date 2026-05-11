import ApiHelper from "./ApiHelper";

export const getCategories = () => {
  return ApiHelper.get("/create/category/");
};
export const getCategoryById = (id) => {
  return ApiHelper.get(`/categories/${id}/`);
};
