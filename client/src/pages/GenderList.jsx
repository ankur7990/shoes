import React, { useState } from "react";
import Button from "../components/common/Button";

const GenderList = ({
  options = ["Male", "Female", "Child"],
  selectedClass = "btn-pill-gradient",
  unselectedClass = "input-pill",
  renderContent,
}) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      {/* Capsule Buttons Container */}
      <div className="scrollbar-hide flex w-full max-w-xl justify-center gap-2 overflow-x-auto rounded-full border border-[#43e77f] p-2 sm:gap-4 sm:p-4">
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <Button
              key={option}
              useDefaultStyle={false}
              type="button"
              onClick={() => setSelected(option)}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-200 sm:px-6 sm:text-base ${isSelected ? selectedClass : unselectedClass}`}
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

export default GenderList;
