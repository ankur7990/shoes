import React from "react";
import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";

const Product = () => {
  const productData = [
    {
      id: 1,
      name: "nike bella",
      brand: "nike",
      price: 1000,
      description: "men's shoes",
      is_male: true,
      is_female: false,
      is_child: false,
      category: 1,
      size: ["7", "8", "9", "10"],
      color: "white",
      product_images: [
        {
          id: 1,
          image: "http://192.168.0.178:8000/media/products/nike.jpeg",
          product: 1,
        },
      ],
    },
    {
      id: 2,
      name: "nike run defy",
      brand: "nike",
      price: 1500,
      description: "female's shoes",
      is_male: true,
      is_female: true,
      is_child: false,
      category: 1,
      size: ["6", "7", "8", "9"],
      color: "pink",
      product_images: [],
    },
    {
      id: 3,
      name: "nike run defy",
      brand: "nike",
      price: 1200,
      description: "male's shoes",
      is_male: true,
      is_female: false,
      is_child: false,
      category: 1,
      size: ["7", "8", "9"],
      color: "grey",
      product_images: [],
    },
    {
      id: 4,
      name: "nike air",
      brand: "nike",
      price: 5000,
      description: "male's shoes",
      is_male: true,
      is_female: false,
      is_child: true,
      category: 1,
      size: ["6", "7", "8", "9", "10"],
      color: "white",
      product_images: [
        {
          id: 2,
          image: "http://192.168.0.178:8000/media/products/nike1.jpeg",
          product: 4,
        },
      ],
    },
    {
      id: 5,
      name: "Runner 2.0",
      brand: "Bacca Bucci",
      price: 225,
      description: "This is fake shoes created.",
      is_male: true,
      is_female: false,
      is_child: false,
      category: 5,
      size: ["6", "7", "8"],
      color: "red",
      product_images: [
        {
          id: 3,
          image: "http://192.168.0.178:8000/media/products/shoes4.png",
          product: 5,
        },
      ],
    },
    {
      id: 6,
      name: "Runner 2.0",
      brand: "Bacca Bucci",
      price: 225,
      description: "This is fake shoes created.",
      is_male: true,
      is_female: false,
      is_child: false,
      category: 5,
      size: ["6", "7", "8"],
      color: "red",
      product_images: [
        {
          id: 3,
          image: "http://192.168.0.178:8000/media/products/shoes4.png",
          product: 5,
        },
      ],
    },
  ];
  return (
    <div className="  flex justify-center items-center">
      <div className="  flex flex-row gap-5">
        {productData.map((item, index) => (
          <div
            key={index}
            className="h-90 w-60 bg-amber-900 radius rounded-xl flex flex-col items-center justify-center gap-3"
          >
            <div className="h-55 w-55 bg-amber-100 rounded-xl">
              <div className="grid grid-col-4 items-baseline ">
                <div className="  w-15 h-8 col-span-1 col-start-1">
                  <div className=" bg-amber-500 w-15 h-6 flex gap-1 justify-center items-center m-1 rounded-2xl p-1">
                    <span>
                      <img src={heart} className="w-5 " alt="" />
                    </span>
                    <button> {item.id}</button>
                  </div>
                </div>
                <div className="  col-start-1 col-end-4 h-40 w-55 flex justify-center items-center">
                  {/* <img src={shoes} alt="" /> */}
                  {item.product_images.map((image) => (
                    <img key={image.id} src={image.image} alt={image.alt} />
                  ))}
                </div>

                <div className="bg-amber-500 w-20 h-7 rounded-tl-lg rounded-br-lg col-span-1 col-start-3">
                  50% off
                </div>
              </div>
            </div>
            <div className="h-25 w-60  radius rounded-xl flex  justify-between ">
              <div className="  flex flex-col text-left ml-3 my-2  ">
                <p className="text-black text-xl"> {item.name}</p>
                <p className="text-black"> {item.brand}</p>
                <h3 className="text-black text-xl font-semibold pt-2">
                  $ 5000.60 {item.price}
                </h3>
              </div>
              <div className="bg-amber-50 h-6 w-6 mt-18 mr-3">
                {" "}
                <button>
                  <img src={heart} alt="" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
