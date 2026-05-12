import ApiHelper from "./ApiHelper";

const getCategories = () => {
  return ApiHelper.get("/create/category/");
};
// export const getCategoryById = (id) => {
//   return ApiHelper.get(`/categories/${id}/`);
// };

export default getCategories;
