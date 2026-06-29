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
            <div className="px-4 py-8 sm:px-6 lg:px-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="decoration-border-bottom text-center text-xl font-normal text-white underline underline-offset-8 hover:decoration-2 sm:text-2xl">
                  {selected} Shoes
                </p>
              </div>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={1}
                slidesPerView={1.1}
                navigation
                // pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                centeredSlides={true}
                centeredSlidesBounds={true}
                // breakpoints={{
                //   640: { slidesPerView: 1.4 },
                //   768: { slidesPerView: 2 },
                //   1024: { slidesPerView: 3 },
                //   1280: { slidesPerView: 5.2 },
                // }}
                breakpoints={{
                  320: {
                    slidesPerView: 1.1,
                    spaceBetween: 12,
                  },

                  480: {
                    slidesPerView: 1.4,
                    spaceBetween: 15,
                  },

                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },

                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                  },

                  1440: {
                    slidesPerView: 4.5,
                    spaceBetween: 30,
                  },
                }}
                className="pb-30"
              >
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="flex h-full w-full items-center justify-center pb-10">
                      <Product data={product} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        }

        return null;
      }}
    />
  );
};

export default GenderComponent;
