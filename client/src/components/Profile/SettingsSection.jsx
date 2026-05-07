// components/profile/SettingsSection.jsx

import React from "react";

const SettingsSection = ({ title, children }) => {
  return (
    <div className="w-full rounded-3xl border border-[#43e77f] p-6 bg-black/20">
      <h3 className="text-xl font-semibold text-white mb-5">{title}</h3>

      {children}
    </div>
  );
};

export default SettingsSection;
