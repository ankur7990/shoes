import React from "react";

const Logo = ({ src = "/logo.png", alt = "App Logo", className = "" }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        src={src}
        alt={alt}
        className={`h-40 w-auto object-contain ${className}`}
      />
    </div>
  );
};

export default Logo;
