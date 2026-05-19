import React from "react";

const ColorSelector = ({ colors = [], selectedColor, onSelectColor }) => {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Select Color</h2>

      <div className="flex items-center gap-4">
        {colors.map((color) => {
          const active = selectedColor === color.name;

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name)}
              className={`h-10 w-10 rounded-full border-2 transition-all ${
                active ? "scale-110 border-[#43e77f]" : "border-white/40"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
