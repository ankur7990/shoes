import React, { useEffect, useState } from "react";
import { handleApiError } from "../api/errorHandler";
import { getAllProducts } from "../api/productService";
import Product from "./Product";

const SpecialShoes = () => {
  const [specialProducts, setspecialProducts] = useState([]);
  const getProductArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  };
  useEffect(() => {
    const fetchSpecialProducts = async () => {
      try {
        const res = await getAllProducts();
        const allProducts = getProductArray(res.data);
        const filtered = allProducts.filter((product) => product.special_shoes);
        setspecialProducts(filtered);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchSpecialProducts();
  }, []);

  return (
    <div className="bg-gradient-layout-main min-h-screen">
      {/* Header */}
      <div className="flex justify-center px-4 py-8 sm:py-10">
        <p className="decoration-border-bottom text-center text-xl font-normal text-white underline underline-offset-8 sm:text-2xl">
          Special Shoes
        </p>
      </div>

      {/* Products */}
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] justify-items-center gap-6 px-4 pb-10 sm:px-6 lg:px-8">
        {specialProducts.length > 0 ? (
          specialProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <p className="text-center text-white">No products found.</p>
        )}
      </div>
    </div>
  );
};
export default SpecialShoes;
