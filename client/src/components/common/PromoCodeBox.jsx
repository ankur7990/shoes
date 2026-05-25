import React from "react";
import { Tag } from "lucide-react";
import Button from "./Button";

const PromoCodeBox = ({
  value = "",
  onChange,
  onApply,
  placeholder = "Enter promo code",
  buttonText = "Apply",
  disabled = false,
}) => {
  return (
    <div
      className="
        flex items-center justify-between gap-3
        rounded-full border-2 border-[#43e77f]
        bg-transparent
        px-4 py-2
        
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 flex-1">
        {/* Icon */}
        <div className="flex items-center justify-center">
          <Tag className="w-5 h-5 text-[#43e77f]" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="
            bg-transparent
            outline-none
            text-white
            placeholder:text-gray-400
            w-full
          "
        />
      </div>

      {/* Apply Button */}
      <Button type="button" onClick={onApply} className="px-5 py-2">
        {buttonText}
      </Button>
    </div>
  );
};

export default PromoCodeBox;
