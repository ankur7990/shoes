import React, { useEffect, useState } from "react";
import { handleApiError } from "../api/errorHandler";
import { getAllProducts } from "../api/productService";
import Product from "./Product";

const TrendingShoes = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const res = await getAllProducts();

        const filtered = res.data.filter((product) => product.trending);
        setTrendingProducts(filtered);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="bg-gradient-layout-main min-h-screen">
      {/* Header */}
      <div className="flex justify-center px-4 py-8 sm:py-10">
        <p className="decoration-border-bottom text-center text-xl font-normal text-white underline underline-offset-8 sm:text-2xl">
          Trendy Shoes
        </p>
      </div>

      {/* Products */}
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-items-center gap-6 px-4 pb-10 sm:px-6 lg:px-8">
        {trendingProducts.length > 0 ? (
          trendingProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <p className="text-center text-white">No products found.</p>
        )}
      </div>
    </div>
  );
};
export default TrendingShoes;
