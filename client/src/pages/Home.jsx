import React, { useEffect, useState } from "react";

import Hero from "../pages/Hero";
import Navbar from "../com/Navbar";
import heroShoes from "../assets/heroshoes.png";
import Button from "../components/common/Button";
import Trending from "./Trending";
import Special from "./Special";

import Product from "../pages/Product";
import Male from "./Category";
import { useAuth } from "../context/AuthContext";
import CategoryItemList from "./Category/CategoryItemList";
import Category from "./Category";

import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";
import shoesCross from "../assets/shoesCross.png";
import Shoes1 from "../assets/shoes1.png";
import Shoes2 from "../assets/shoes2.png";
import Shoes3 from "../assets/shoes3.png";
import Shoes4 from "../assets/shoes4.png";
import CategoryComponent from "./Category/CategoryComponent.jsx";
import getCategories from "../api/categoryService.js";

const Home = () => {
  const localItems = [
    {
      id: 1,
      img: Shoes1,
      review: "4.5",
    },
    {
      id: 2,
      img: Shoes2,
      review: "4.5",
    },
    {
      id: 3,
      img: Shoes3,
      review: "4.5",
    },
    {
      id: 4,
      img: Shoes4,
      review: "4.5",
    },
    {
      id: 5,
      img: Shoes3,
      review: "4.5",
    },
    {
      id: 6,
      img: Shoes3,
      review: "4.5",
    },
  ];

  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("data fetched useeffect.");
    getCategoryList();
    // setTimeout(() => {

    //   console.log("combined items", combinedItems);
    // }, 1000);
  }, []);

  const getCategoryList = async () => {
    const category = await getCategories();
    // console.log(category.data);
    console.log("full response:", category);
    console.log("response data:", category.data);
    console.log("is array?", Array.isArray(category.data));
    setList(category.data);
  };

  const combinedItems = list.map((item) => {
    const localItem = localItems.find((data) => data.id === item.id);

    return {
      ...item,
      ...localItem,
    };
  });

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
      <CategoryComponent items={combinedItems} />
      {/* <Product /> */}
      {/* Trending */}
      {/* <Trending /> */}
      {/* Special */}
      {/* <Product /> */}
      {/* <Special /> */}
    </div>
  );
};

export default Home;
