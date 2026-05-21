import React from "react";
import GenderList from "./GenderList";
import Category from "./Category";

// import heart from "../assets/react.svg";
// import shoes from "../assets/shoes.png";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GenderComponent = ({ items }) => {
  // console.log("Gender data", items);

  const getFilteredProducts = (selected) => {
    if (selected === "Male") {
      return items.filter((product) => product.is_male);
    }

    if (selected === "Female") {
      return items.filter((product) => product.is_female);
    }

    if (selected === "Child") {
      return items.filter((product) => product.is_child);
    }

    return [];
  };

  const handleClick = () => {
    console.log("clicked.");
  };

  //   return (
  //     <div className=" ">
  //       <GenderList
  //         renderContent={(selected) => {
  //           const filteredProducts = getFilteredProducts(selected);

  //           if (
  //             selected === "Male" ||
  //             selected === "Female" ||
  //             selected === "Child"
  //           ) {
  //             return (
  //               <div className="">
  //                 <div>
  //                   <p className="text-left pl-20 text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom">
  //                     Category List
  //                   </p>
  //                 </div>
  //                 <div className="flex justify-center items-center">
  //                   <div className="  flex flex-row flex-wrap gap-4 p-20">
  //                     {filteredProducts.map((item, index) => (
  //                       <div
  //                         key={index}
  //                         className="h-90 w-60 bg-amber-900 radius rounded-xl flex flex-col items-center justify-center gap-3"
  //                       >
  //                         <div className="h-55 w-55 bg-amber-100 rounded-xl">
  //                           <div className="grid grid-col-4 items-baseline ">
  //                             <div className="  w-15 h-8 col-span-1 col-start-1">
  //                               <div className=" bg-amber-500 w-15 h-6 flex gap-1 justify-center items-center m-1 rounded-2xl p-1">
  //                                 <span>
  //                                   <img src={heart} className="w-5 " alt="" />
  //                                 </span>
  //                                 <button> {item.id}</button>
  //                               </div>
  //                             </div>
  //                             <div className="  col-start-1 col-end-4 h-40 w-55 flex justify-center items-center">
  //                               {/* <img src={shoes} alt="" /> */}
  //                               {item.product_images.map((image) => (
  //                                 <img
  //                                   key={image.id}
  //                                   src={image.image}
  //                                   alt={image.alt}
  //                                 />
  //                               ))}
  //                             </div>

  //                             <div className="bg-amber-500 w-20 h-7 rounded-tl-lg rounded-br-lg col-span-1 col-start-3">
  //                               50% off
  //                             </div>
  //                           </div>
  //                         </div>
  //                         <div className="h-25 w-60  radius rounded-xl flex  justify-between ">
  //                           <div className="  flex flex-col text-left ml-3 my-2  ">
  //                             <p className="text-black text-xl"> {item.name}</p>
  //                             <p className="text-black"> {item.brand}</p>
  //                             <h3 className="text-black text-xl font-semibold pt-2">
  //                               $ 5000.60 {item.price}
  //                             </h3>
  //                           </div>
  //                           <div className="bg-amber-50 h-6 w-6 mt-18 mr-3">
  //                             {" "}
  //                             <button>
  //                               <img src={heart} alt="" />
  //                             </button>
  //                           </div>
  //                         </div>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </div>
  //             );
  //           }

  //           return null;
  //         }}
  //       />
  //     </div>
  //   );
  // };

  // export default GenderComponent;
  return (
    <GenderList
      renderContent={(selected) => {
        const filteredProducts = getFilteredProducts(selected);

        if (
          selected === "Male" ||
          selected === "Female" ||
          selected === "Child"
        ) {
          return (
            <div className="px-6 py-10">
              <div className="flex items-center justify-between mb-6">
                <p className="text-2xl font-normal text-white underline underline-offset-8">
                  {selected} Shoes
                </p>

                {/* <button
                  className="text-white text-sm underline"
                  onClick={handleClick}
                >
                  View All
                </button> */}
              </div>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={1}
                slidesPerView={1.1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1.4 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 5.2 },
                }}
                className="pb-30"
              >
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="h-full mb-10">
                      <Product data={product} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                {filteredProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="min-w-[280px] snap-start">
                    <Product data={product} />
                  </div>
                ))}
              </div> */}
            </div>
          );
        }

        return null;
      }}
    />
  );
};

export default GenderComponent;
