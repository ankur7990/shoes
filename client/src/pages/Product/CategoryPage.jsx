import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductsByCategory } from "../../api/categoryService";
import { handleApiError } from "../../api/errorHandler";
import Product from "../Product";
import SearchBar from "../SearchBar";

const CategoryPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  //   const categoryId = location.state?.categoryId;
  const categoryName =
    location.state?.categoryName?.replace("\n", " ") || "Category";

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await getProductsByCategory(id);
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
    <div>
      <div className="bg-gradient-layout-main">
        {/* <div className="flex justify-center p-10">
          <input type="text" className="input-pill-category" />
        </div> */}
        <SearchBar />

        <div className="flex justify-center">
          <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2">
            {categoryName}
          </p>
        </div>

        <br />

        <div className="">
          {/* <div className="flex flex-col gap-10"> */}
          <div className=" flex flex-row flex-wrap gap-5 p-10 bg-amber-100   ">
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
