import toast from "react-hot-toast";

export const handleApiError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    "Something went wrong ❌";

  toast.error(message);
};
