// components/profile/ProfileCard.jsx

import React from "react";

const ProfileCard = ({ user, children }) => {
  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-3xl border border-[#43e77f] bg-black/20 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.avatar || "https://via.placeholder.com/120"}
          alt="profile"
          className="w-28 h-28 rounded-full border-2 border-[#43e77f] object-cover"
        />

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white">{user?.name}</h2>

          <p className="text-gray-300">{user?.email}</p>
        </div>

        <div className="w-full mt-4 space-y-3">
          <ProfileRow label="Username" value={user?.username} />
          <ProfileRow label="Mobile" value={user?.mobile} />
          <ProfileRow label="DOB" value={user?.dob} />
          <ProfileRow label="Gender" value={user?.gender} />
        </div>

        {children}
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b border-gray-700 pb-2">
      <span className="text-gray-400">{label}</span>

      <span className="text-white">{value || "-"}</span>
    </div>
  );
};

export default ProfileCard;
