// components/profile/ProfileMenuDropdown.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileMenuDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <img
        src={user?.avatar || "https://via.placeholder.com/40"}
        alt="avatar"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full border border-[#43e77f] cursor-pointer"
      />

      {open && (
        <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-[#43e77f] bg-[#0f172a] shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b border-gray-700">
            <p className="text-white font-medium">{user?.name}</p>

            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <Link
            to="/profile"
            className="block px-4 py-3 text-white hover:bg-[#43e77f]/10"
          >
            My Profile
          </Link>

          <Link
            to="/settings"
            className="block px-4 py-3 text-white hover:bg-[#43e77f]/10"
          >
            Settings
          </Link>

          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenuDropdown;
