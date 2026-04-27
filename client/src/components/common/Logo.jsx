import React from "react";

const Logo = ({ src = "/logo.png", alt = "App Logo", className = "" }) => {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className={`h-50 w-auto object-contain ${className}`}
      />
    </div>
  );
};

export default Logo;
