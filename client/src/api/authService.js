import ApiHelper from "./ApiHelper";

const signupUser = (data) => {
  console.log("signup");

  return ApiHelper.post("/user-register/", data);
};

const loginUser = (data) => {
  return ApiHelper.post("/user-login/", data);
};

const forgotPassword = (data) => {
  return ApiHelper.post("/otp-for-forgot-password/", data);
};

// const verifyOtp = (data) => {
//   return ApiHelper.post("/verify-otp/", data);
// };

const resetPassword = (data) => {
  return ApiHelper.post("/reset-password/", data);
};

const getUserProfile = (data) => {
  return ApiHelper.get("/user-profile/", data);
};

const updateUserProfile = (data) => {
  return ApiHelper.patch("/user-profile/", data);
};

const updateUserPassword = (data) => {
  return ApiHelper.patch("/user-update-password/", data);
};

const deleteUserAccount = (data) => {
  return ApiHelper.delete("/user-delete/", data);
};

const getAllShoes = (data) => {
  return ApiHelper.get("/create/category", data);
};
export {
  signupUser,
  loginUser,
  forgotPassword,
  // verifyOtp,
  resetPassword,
  getUserProfile,
  deleteUserAccount,
  updateUserProfile,
  updateUserPassword,
  getAllShoes,
};
