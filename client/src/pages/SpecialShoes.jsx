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
    <div>
      <div className="bg-gradient-layout-main ">
        <div className="flex justify-center p-10">
          <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2 ">
            Special Shoes
          </p>
        </div>
        <br />
        <div className=" flex flex-row flex-wrap gap-5 mx-10">
          {specialProducts.length > 0 ? (
            specialProducts.map((product) => (
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
export default SpecialShoes;
