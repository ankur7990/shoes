import ApiHelper from "./ApiHelper";

const signupUser = (data) => {
  console.log("signup");

  return ApiHelper.post("/user-register/", data);
};

const loginUser = (data) => {
  return ApiHelper.post("/user-login/", data);
};

const forgotPassword = (data) => {
  return ApiHelper.post("/auth/forgot-password", data);
};

const verifyOtp = (data) => {
  return ApiHelper.post("/auth/verify-otp", data);
};

const resetPassword = (data) => {
  return ApiHelper.post("/auth/reset-password", data);
};

export { signupUser, loginUser, forgotPassword, verifyOtp, resetPassword };
