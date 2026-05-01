import React from "react";
import Button from "../components/common/Button";

const CategoryList = () => {
  return (
    <section className="flex justify-center items-center ">
      <div className="input-pill-category space-x-4 p-10 ">
        <Button>Male</Button>
        <Button>Female</Button>
        <Button>Child</Button>
      </div>
    </section>
  );
};

export default CategoryList;
