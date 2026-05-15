import ApiHelper from "./ApiHelper";

const getCategories = (data) => {
  return ApiHelper.get("/categories", data);
};

// export const getCategoryById = (id) => {
//   return ApiHelper.get(`/categories/${id}/`);

// };

export default getCategories;
