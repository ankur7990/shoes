import { useEffect, useState } from "react";
import ProductImageGallary from "../pages/Product/ProductImageGallery";
import ProductHeader from "../pages/Product/ProductHeader";
import SizeSelector from "../pages/Product/SizeSelector";
import ColorSelector from "../pages/Product/ColorSelector";
import ProductPrice from "../pages/Product/ProductPrice";
import DeliveryReturns from "../pages/Product/DeliveryReturns";
import ProductActions from "../pages/Product/ProductActions";
import ProductImageGallery from "../pages/Product/ProductImageGallery";
import ProductDescription from "../pages/Product/ProductDescription";
import { useParams } from "react-router-dom";
import { handleApiError } from "../api/errorHandler";
import { getProductById } from "../api/productService";
import ProductReview from "./Product/ProductReview";
import ProductReaction from "./Product/ProductReaction";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("ID is:", id);

  const [selectedSize, setSelectedSize] = useState(40);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [product, setProduct] = useState(null);

  // const product = {
  //   name: "Nike Air Zoom",
  //   price: 5999,
  //   description:
  //     "Premium running shoes with lightweight comfort and flexible sole.",
  //   deliveryText: "Delivery within 3-5 business days.",
  //   returnsText: "Easy 7-day return policy.",
  //   // images: [
  //   //   "/images/shoe1.png",
  //   //   "/images/shoe2.png",
  //   //   "/images/shoe3.png",
  //   //   "/images/shoe4.png",
  //   // ],
  //   colors: [
  //     { name: "Black", value: "#111111" },
  //     { name: "White", value: "#f5f5f5" },
  //     { name: "Blue", value: "#2563eb" },
  //   ],
  //   sizes: [5, 6, 7, 8, 9, 10, 11, 12],
  // };

  useEffect(() => {
    console.log("ID is:", id);

    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        // depending on API shape
        // adjust this if backend wraps response in data.data
        const productData = res.data.data || res.data;
        setProduct(productData);
        console.log("productData", productData);

        // set default color from API
        // setSelectedColor(productData.color || null);
      } catch (error) {
        handleApiError(error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);
  if (!product) {
    return <div className="text-white text-center pt-20">Loading...</div>;
  }

  // const imageUrl = product?.image || product?.product_images?.[0]?.image;

  return (
    <div className="min-h-screen bg-gradient-layout-main text-white px-4 py-6 bg-amber-400">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery images={product.product_images || []} />

          <div className="space-y-6">
            <ProductHeader name={product.name} />
            <ProductReaction />

            <ProductPrice price={product.price} />
            <SizeSelector
              sizes={product.size || []}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
            {/* <ColorSelector
              colors={product.color}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            /> */}
            <ProductDescription text={product.description} />
            <DeliveryReturns
              deliveryText={product.deliveryText}
              returnsText={product.returnsText}
            />
            <ProductActions
              onAddToCart={() => console.log("Add to cart")}
              onBuyNow={() => console.log("Buy now")}
            />
          </div>
        </div>
        {/* Review Section */}
        <div>
          <ProductReview reviews={product.is_liked} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
