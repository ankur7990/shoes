import toast from "react-hot-toast";

export const handleApiError = (error) => {
  const data = error?.response?.data;

  // 1. If backend sends message
  if (data?.message && data.message !== "data not available.") {
    toast.error(data.message);
    return;
  }

  // 2. Handle field errors (IMPORTANT for your case)
  if (data?.error && typeof data.error === "object") {
    const firstError = Object.values(data.error)[0];

    if (Array.isArray(firstError)) {
      toast.error(firstError[0]); // show first error
      return;
    }
  }

  // 3. Django/FastAPI fallback
  if (data?.detail) {
    toast.error(data.detail);
    return;
  }

  // 4. Network error
  if (!error.response) {
    toast.error("Network error 🌐");
    return;
  }

  // 5. Final fallback
  toast.error("Something went wrong ❌");
};
