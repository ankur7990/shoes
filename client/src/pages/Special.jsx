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
      <div className="   flex flex-col ">
        <div className="flex flex-col justify-center items-center ">
          <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2">
            {categoryName}
          </p>
        </div>
        <div className="flex flex-row justify-end mr-30">
          <Link
            to="/specialshoes"
            className="text-center text-xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2 cursor-pointer"
          >
            See all
          </Link>
        </div>
        {/* <div className="flex flex-col gap-10"> */}
        <div className=" flex flex-row flex-wrap gap-5 p-10  ">
          {items.length > 0 ? (
            items.map((product) => <Product key={product.id} data={product} />)
          ) : (
            <p className="text-white text-center">No products found.</p>
          )}
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Trending;
