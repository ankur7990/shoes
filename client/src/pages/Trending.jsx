import React, { useEffect, useState } from "react";
import heart from "../assets/react.svg";
import shoes from "../assets/shoes.png";
import { useLocation, useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/productService";
import { handleApiError } from "../api/errorHandler";
import Product from "./Product";

const Trending = ({ items }) => {
  const { id } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("Category");

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
      <div className="h-screen w-screen  flex justify-center items-center">
        <div className="h-screen w-screen  flex justify-center items-center">
          {/* <div className="h-50 w-55 bg-blue-200 rounded-xl border-blue-500 border-2 p-2">
            <div className="flex flex-col">
              <div className=" flex justify-between items-center ">
                <div className=" flex gap-1 justify-center items-center  font-bold ">
                  <p className="text-black ">Lebron TR 1</p>
                </div>
                <div className="bg-blue-400 h-6 w-6  ">
                  <button>
                    <img src={heart} alt="" />
                  </button>
                </div>
              </div>
              <div className="pb-5   col-start-1 col-end-4 h-27 w-50 flex justify-center items-center">
                <img src={shoes} alt="" />
              </div>
              <div className=" flex flex-col ">
                <div className=" bg-white w-10 h-5 flex gap-1 text-black text-sm font-medium justify-center items-center m-1 rounded-xl p-1">
                  <span>
                    <img src={heart} className="w-5 " alt="" />
                  </span>
                  <button>4.5</button>
                </div>
                <div className="  text-left pl-1 text-black font-black  ">
                  $ 63.43
                  <span className="text-gray-500 text-[10px]">$76.00</span>{" "}
                </div>
              </div>
            </div>
          </div> */}
          <div className="bg-gradient-layout-main">
            <div className="flex justify-center">
              <p className="text-center text-2xl font-normal text-white underline underline-offset-12 decoration-border-bottom hover:decoration-2">
                {categoryName}
              </p>
            </div>
            <div className="">
              {/* <div className="flex flex-col gap-10"> */}
              <div className=" flex flex-row flex-wrap gap-5 p-10 bg-amber-100   ">
                {items.length > 0 ? (
                  items.map((product) => (
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
      </div>
    </>
  );
};

export default Trending;

// const Trending = () => {
//   return (
//     <>
//       <div className="h-screen w-screen  flex justify-center items-center">
//         <div className="h-screen w-screen bg-amber-700 flex justify-center items-center">
//           <div className="h-50 w-55 bg-blue-200 rounded-xl border-blue-500 border-2 p-2">
//             <div className="flex flex-col">
//               <div className=" flex justify-between items-center ">
//                 <div className=" flex gap-1 justify-center items-center  font-bold ">
//                   {/* <label className="text-black">Lebron TR 1</label> */}
//                   <p className="text-black ">Lebron TR 1</p>
//                 </div>
//                 <div className="bg-blue-400 h-6 w-6  ">
//                   <button>
//                     <img src={heart} alt="" />
//                   </button>
//                 </div>
//               </div>
//               <div className="pb-5   col-start-1 col-end-4 h-27 w-50 flex justify-center items-center">
//                 <img src={shoes} alt="" />
//               </div>
//               <div className=" flex flex-col ">
//                 <div className=" bg-white w-10 h-5 flex gap-1 text-black text-sm font-medium justify-center items-center m-1 rounded-xl p-1">
//                   <span>
//                     <img src={heart} className="w-5 " alt="" />
//                   </span>
//                   <button>4.5</button>
//                 </div>
//                 <div className="  text-left pl-1 text-black font-black  ">
//                   $ 63.43
//                   <span className="text-gray-500 text-[10px]">$76.00</span>{" "}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Trending;
