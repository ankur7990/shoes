import React from "react";
import Button from "../components/common/Button";

const Hero = ({
  title,
  subtitle,
  image,
  buttonText,
  onButtonClick,
  reverse = false,
  className = "",
}) => {
  return (
    <section className="w-full px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-20">
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center gap-10 rounded-3xl bg-green-800 p-6 sm:p-8 lg:flex-row lg:p-16 xl:p-20 ${reverse ? "lg:flex-row-reverse" : ""} `}
      >
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-base text-gray-300 sm:text-lg">{subtitle}</p>

          {buttonText && (
            <div className="mt-6">
              <Button className={className} onClick={onButtonClick}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>

        {/* Image */}
        {image && (
          <div className="flex flex-1 justify-center">
            <img
              src={image}
              alt="hero"
              className="h-auto w-full max-w-[280px] object-contain transition-transform duration-500 hover:scale-105 sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px]"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
