import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductsByCategory,
  normalizeProductResponse,
} from "../../api/productService";
import Product from "../Product";
import SearchBar from "../SearchBar";
import getCategories from "../../api/categoryService";
import { handleApiError } from "../../api/errorHandler";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Category");

  // fetch category name
  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const res = await getCategories();

        const matchedCategory = res.data.find(
          (cat) => Number(cat.id) === Number(id),
        );

        if (matchedCategory) {
          setCategoryName(matchedCategory.name.replace("\n", " "));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryName();
  }, [id]);
  // fetch products
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await getProductsByCategory(id);
        // console.log(res.data.results);

        setProducts(normalizeProductResponse(res.data));
      } catch (error) {
        handleApiError(error);
      }
    };

    if (id) {
      fetchCategoryProducts();
    }
  }, [id]);

  return (
    <div>
      <div className="bg-gradient-layout-main">
        {/* <div className="flex justify-center p-10">
          <input type="text" className="input-pill-category" />
        </div> */}
        {/* <SearchBar /> */}

        <div className="flex justify-center">
          <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2">
            {categoryName}
          </p>
        </div>

        <br />

        <div className="">
          {/* <div className="flex flex-col gap-10"> */}
          {/* <div className=" flex flex-row flex-wrap gap-5 p-10    "> */}
          <div
            className=" mx-auto grid max-w-7xl grid-cols-1
    gap-6
    px-4
    py-6
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
  "
          >
            {products.length > 0 ? (
              products.map((product) => (
                <Product key={product.id} data={product} />
              ))
            ) : (
              <p className="text-white text-center">No products found.</p>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
