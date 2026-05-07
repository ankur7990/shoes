// components/profile/AvatarUpload.jsx

import React from "react";
import Button from "../ui/Button";

const AvatarUpload = ({ image, onChange, onRemove, className = "" }) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#43e77f]">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex gap-3">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />

          <Button>Upload</Button>
        </label>

        <Button
          useDefaultStyle={false}
          className="input-pill"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default AvatarUpload;
