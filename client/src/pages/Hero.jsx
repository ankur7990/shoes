import React from "react";
import Button from "../components/common/Button";

const Hero = ({
  title,
  subtitle,
  image,
  buttonText,
  onButtonClick,
  reverse = false,
}) => {
  return (
    <section className="w-full py-12 md:py-20 px-20  ">
      <div
        className={`
          max-w-7xl mx-auto px-6
          flex flex-col md:flex-row items-center gap-10 bg-green-800 rounded-2xl p-20
          ${reverse ? "md:flex-row-reverse" : ""}
        `}
      >
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>

          <p className="mt-4 text-lg text-gray-300">{subtitle}</p>

          {buttonText && (
            <div className="mt-6">
              <Button onClick={onButtonClick}>{buttonText}</Button>
            </div>
          )}
        </div>

        {/* Image Section */}
        {image && (
          <div className="flex-1 flex justify-center">
            <img
              src={image}
              alt="hero"
              className="w-[600px] h-96 object-cover absolute top-4  w-12 h-12 "
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
