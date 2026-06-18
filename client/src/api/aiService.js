import ApiHelper from "./ApiHelper";

export const scanStyle = (formData) => {
  return ApiHelper.post("/ai-photo/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
