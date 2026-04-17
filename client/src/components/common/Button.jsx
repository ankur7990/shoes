import React from "react";

const Button = () => {
  return (
    <div className="flex flex-col gap-5">
      <button className="w-40 border-2 rounded-2xl bg-fill-gradient border-gradient   text-white ">
        Login
      </button>
      <button className="w-40 border-2 rounded-2xl ">Register Now</button>
    </div>
  );
};

export default Button;

//background: linear-gradient(90deg, #4A9B7F, #0A3431);
