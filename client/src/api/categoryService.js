import ApiHelper from "./ApiHelper";

const getCategories = () => {
  return ApiHelper.get("/categories");
};
// export const getCategoryById = (id) => {
//   return ApiHelper.get(`/categories/${id}/`);
// };

export default getCategories;
