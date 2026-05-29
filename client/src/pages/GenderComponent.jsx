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
                <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2">
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
