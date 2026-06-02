import ApiHelper from "./ApiHelper";

const getAddresses = () => {
  return ApiHelper.get("/address/");
};

const createAddress = (data) => {
  return ApiHelper.post("/address/", data);
};

const updateAddress = (id, data) => {
  return ApiHelper.patch(`/address/${id}/`, data);
};

const deleteAddress = (id) => {
  return ApiHelper.delete(`/address/${id}/`);
};

export { getAddresses, createAddress, updateAddress, deleteAddress };
