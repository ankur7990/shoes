// components/profile/EmptyState.jsx

import React from "react";

const EmptyState = ({
  title = "No Data Found",
  subtitle = "There is nothing to display right now.",
  image,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      {image && <img src={image} alt="empty" className="w-40 mb-6" />}

      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <p className="text-gray-400 mt-2 max-w-md">{subtitle}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
