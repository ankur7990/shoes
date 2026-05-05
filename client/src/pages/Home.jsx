import React from "react";

import Hero from "../pages/Hero";
import Navbar from "../com/Navbar";
import heroShoes from "../assets/heroshoes.png";
import Button from "../components/common/Button";
import CategoryList from "../pages/CategoryList";
import Trending from "./Trending";
import Special from "./Special";

import Product from "../pages/Product";

const Home = () => {
  return (
    <div className="bg-gradient-layout-main">
      {/* Hero1 */}
      {/* <Hero
        title="Build Modern Web Apps Faster 🚀"
        subtitle="Reusable components help you scale your MERN applications efficiently."
        image={heroShoes}
        buttonText="Get Started"
        onButtonClick={() => console.log("Clicked")}
      /> */}
      {/* Category List */}
      {/* <CategoryList
        renderContent={(selected) => {
          if (selected === "Male") return <div>Male products here 👔</div>;

          if (selected === "Female") return <div>Female products here 👗</div>;

          if (selected === "Child") return <div>Kids products here 🧸</div>;
        }}
      /> */}
      {/* <Product /> */}
      {/* Trending */}
      <Trending />
      {/* Special */}
      {/* <Product /> */}
      <Special />
    </div>
  );
};

export default Home;
