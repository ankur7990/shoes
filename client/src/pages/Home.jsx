import React from "react";

import Hero from "../pages/Hero";
import Product from "./Product";
import Navbar from "../com/Navbar";
import heroShoes from "../assets/heroshoes.png";
import Button from "../components/common/Button";
import CategoryList from "../pages/CategoryList";

const Home = () => {
  return (
    <div className="bg-gradient-layout-main">
      {/* Hero1 */}
      <Hero
        title="Build Modern Web Apps Faster 🚀"
        subtitle="Reusable components help you scale your MERN applications efficiently."
        image={heroShoes}
        buttonText="Get Started"
        onButtonClick={() => console.log("Clicked")}
      />
      {/* Category List */}
      <CategoryList />
      {/* Trending */}
      {/* Special */}
      {/* <Product /> */}
    </div>
  );
};

export default Home;
