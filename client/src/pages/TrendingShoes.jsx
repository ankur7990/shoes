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
    <div>
      <div className="bg-gradient-layout-main">
        <div className="flex justify-center p-10">
          <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2 ">
            Trendy Shoes
          </p>
        </div>
        <br />
        <div className="px-20 flex flex-row flex-wrap gap-5">
          {trendingProducts.length > 0 ? (
            trendingProducts.map((product) => (
              <Product key={product.id} data={product} />
            ))
          ) : (
            <p className="text-white text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TrendingShoes;
