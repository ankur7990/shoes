import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const PriceRangeSlider = ({ values, setValues, min = 1000, max = 20000 }) => {
  const [priceRange, setPriceRange] = useState([2000, 12000]);

  return (
    <div className="w-full">
      <div className="mb-3 flex justify-between">
        <label className="font-medium">Budget Range</label>

        <span className="text-[#43e77f]">
          ₹{values[0]} - ₹{values[1]}
        </span>
      </div>

      <Range
        values={values}
        step={500}
        min={min}
        max={max}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full rounded-full"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#444", "#43e77f", "#444"],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="
              h-5
              w-5
              rounded-full
              bg-[#43e77f]
              shadow-lg
              outline-none
            "
          />
        )}
      />
    </div>
  );
};

export default PriceRangeSlider;
