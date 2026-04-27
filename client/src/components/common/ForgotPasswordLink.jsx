import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordLink = ({
  to = "/forgot-password",
  label = "Forgot Password?",
  align = "right",
}) => {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mt-2 ${alignment[align]}`}>
      <Link
        to={to}
        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        {label}
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
