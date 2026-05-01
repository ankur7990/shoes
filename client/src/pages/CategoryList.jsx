import React, { useState } from "react";
import Button from "../components/common/Button";

const CategoryList = ({
  options = ["Male", "Female", "Child"],
  selectedClass = "btn-pill-gradient",
  unselectedClass = "input-pill",
  renderContent,
}) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="w-full flex flex-col items-center gap-6 space-x-9">
      {/* Capsule Buttons Container */}
      <div className="flex rounded-full border border-[#43e77f] overflow-hidden p-8 space-x-10 ">
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <Button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`rounded-none px-6 py-2 transition-all duration-200
                ${isSelected ? selectedClass : unselectedClass}`}
            >
              {option}
            </Button>
          );
        })}
      </div>

      {/* Dynamic Content Section */}
      <div className="w-full">{renderContent && renderContent(selected)}</div>
    </div>
  );
};

export default CategoryList;
