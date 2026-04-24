import React from "react";
import Button from "../com/Button";
import Input from "../com/Input";

const Reusable = () => {
  return (
    <div>
      <Button text="Login" />
      {/* <Input label="Email" type="email" name="email" onChange={handleChange} /> */}
    </div>
  );
};

export default Reusable;
