import React, { useEffect, useState } from "react";
import Product from "../Product";
// import {getAllProducts} from "../../api/productService";
import { handleApiError } from "../../api/errorHandler";
import { useLocation, useParams } from "react-router-dom";
import { getProductsByCategory } from "../../api/productService";

const SportShoes = () => {
  const location = useLocation();
  const { id } = useParams();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const categoryId = location.state?.categoryId;
  const categoryName = location.state?.categoryName || "Sport Shoes";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // const res = await getAllProducts();

      // const filtered = res.data.filter((product) => {
      //   return Number(product.category) === Number(id);
      // });

      try {
        // 🔥 API CALL HERE
        const res = await getProductsByCategory(id);
        console.log(res.data);

        setProducts(res.data.results);
      } catch (error) {
        handleApiError(error);
      }
      setFilteredProducts(filtered);
    };

    fetchProducts();
  }, [id]);

  return (
    <div>
      <div className="bg-gradient-layout-main">
        <div className="flex justify-center">
          <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2 ">
            Sport Shoes {categoryName}
          </p>
        </div>
        <br />
        <div className="px-20">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product key={product.id} data={products} />
            ))
          ) : (
            <p className="text-white text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportShoes;
