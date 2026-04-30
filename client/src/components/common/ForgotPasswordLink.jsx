import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordLink = ({
  to,
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
        className="text-sm text-gray-100 hover:text-gray-200 hover:underline"
      >
        {label}
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;
