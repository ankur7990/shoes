import React, { useEffect, useState } from "react";

import Hero from "../pages/Hero";
import Navbar from "../com/Navbar";
import heroShoes from "../assets/heroshoes.png";
import Button from "../components/common/Button";
import Trending from "./Trending";
import Special from "./Special";

import Product from "../pages/Product";
// import Male from "./Category";
import { useAuth } from "../context/AuthContext";
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
import GenderComponent from "./GenderComponent.jsx";
// import { getAllProducts } from "../api/productService.js";
import SearchBar from "./SearchBar.jsx";
import { getAllProducts } from "../api/productService.js";
import Star from "../components/common/Star.jsx";
import ProductDetails from "./ProductDetails.jsx";
import Checkout from "./Checkout.jsx";

const Home = () => {
  // const localProducts = [
  //   {
  //     id: 1,
  //     name: "Runner 1.0",
  //     brand: "Bacca Bucci",
  //     price: 225,
  //     description: "This is fake shoes created.",
  //     is_male: true,
  //     is_female: false,
  //     is_child: false,
  //     category: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "Runner 2.0",
  //     brand: "Bacca Bucci",
  //     price: 225,
  //     description: "This is fake shoes created.",
  //     is_male: false,
  //     is_female: false,
  //     is_child: true,
  //     category: 2,
  //   },
  //   {
  //     id: 3,
  //     name: "Runner 3.0",
  //     brand: "Bacca Bucci",
  //     price: 225,
  //     description: "This is fake shoes created.",
  //     is_male: true,
  //     is_female: false,
  //     is_child: false,
  //     category: 3,
  //   },
  //   {
  //     id: 4,
  //     name: "Runner 5.0",
  //     brand: "Bacca Bucci",
  //     price: 225,
  //     description: "This is fake shoes created.",
  //     is_male: false,
  //     is_female: true,
  //     is_child: false,
  //     category: 2,
  //   },
  // ];
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
  // const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        // console.log(res);

        setCategories(res.data);
      } catch (error) {
        console.log("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        console.log(`get all products : `, res);

        setProducts(res);

        // filter trending products
        const trending = res.data.filter(
          (product) => product.trending === true,
        );

        // filter special products
        const special = res.data.filter(
          (product) => product.special_shoes === true,
        );

        // console.log("trending ", trending);
        // console.log("special", special);

        setTrendingProducts(trending);
        setSpecialProducts(special);
      } catch (error) {
        console.log("Products error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-layout-main">
      {/* <SearchBar /> */}
      {/* Hero1 */}
      {/* <Hero
        title="Build Modern Web Apps Faster 🚀"
        subtitle="Reusable components help you scale your MERN applications efficiently."
        image={heroShoes}
        buttonText="Get Started"
        onButtonClick={() => console.log("Clicked")}
      /> */}
      {/* Category List */}
      {/* <GenderComponent items={products} /> */}
      {/* <CategoryComponent items={categories} /> */}

      {/* <Product /> */}
      {/* Trending */}
      <Trending items={trendingProducts.slice(0, 6)} />
      {/* Special */}
      {/* <Product /> */}
      {/* <Special items={specialProducts.slice(0, 6)} /> */}
      {/* <ProductDetails /> */}
      {/* <Checkout /> */}
    </div>
  );
};

export default Home;
