import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/productService";
import { handleApiError } from "../api/errorHandler";
import Product from "./Product";

const Trending = ({ items }) => {
  const { id } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Special Shoes");

  // fetch products
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await getProductsByCategory(id);
        console.log(res.data);

        setProducts(res.data);
      } catch (error) {
        handleApiError(error);
      }
    };

    if (id) {
      fetchCategoryProducts();
    }
  }, [id]);

  return (
    <>
      <div className="flex flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex justify-center">
          <p className="decoration-border-bottom text-center text-xl font-normal text-white underline underline-offset-8 sm:text-2xl">
            {categoryName}
          </p>
        </div>

        {/* See All */}
        <div className="mt-4 flex justify-center sm:justify-end lg:pr-8">
          <Link
            to="/specialshoes"
            className="decoration-border-bottom cursor-pointer text-base font-normal text-white underline underline-offset-8 sm:text-lg lg:text-xl"
          >
            See all
          </Link>
        </div>

        {/* Products */}
        <div className="mt-6 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {items.length > 0 ? (
            items.map((product) => <Product key={product.id} data={product} />)
          ) : (
            <p className="text-center text-white">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Trending;
