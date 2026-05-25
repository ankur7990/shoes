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
import WishlistSlider from "./Product/ProductReaction";
import { addToCart, getCart } from "../api/cartService";

const ProductDetails = () => {
  const { id } = useParams();
  console.log("ID is:", id);

  const [selectedSize, setSelectedSize] = useState(40);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [cartCount, setCartCount] = useState(0);

  //passed product details
  useEffect(() => {
    console.log("ID is:", id);

    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        // depending on API shape
        // adjust this if backend wraps response in data.data
        const productData = res.data.data || res.data;
        setProduct(productData);
        console.log("productData send to product details page", productData);

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

  const fetchCart = async () => {
    try {
      const response = await getCart();
      if (response?.data?.status) {
        setCartCount(response.data.items?.length || 0);
      }
    } catch (error) {
      console.log("Cart fetch error:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      const payload = {
        product: Number(product.id),
        quantity: 1,
      };

      const response = await addToCart(payload);
      console.log("item added", response.data);

      if (response?.data?.status) {
        await fetchCart();
        setSuccessMessage(response.data.message || "Item added to cart");
        setTimeout(() => setSuccessMessage(""), 2000);
      }
    } catch (error) {
      console.log("Add to cart error:", error);
      setSuccessMessage("Failed to add item to cart");
      setTimeout(() => setSuccessMessage(""), 2000);
    } finally {
      setCartLoading(false);
    }
  };

  const handleBuyNow = async () => {
    console.log("handleBuyNow");
  };
  return (
    <div className="min-h-screen bg-gradient-layout-main text-white px-4 py-6 bg-amber-400">
      <div className="mx-auto max-w-7xl">
        {/* small success toast */}
        {successMessage && (
          <div className="fixed right-5 top-5 z-50 rounded-2xl border border-[#43e77f] bg-black px-4 py-3 text-sm text-white shadow-lg">
            {successMessage}
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-2 ">
          <ProductImageGallery images={product.product_images || []} />

          <div className="space-y-6">
            {/* Header + Wishlist */}
            <div className="flex items-start justify-between gap-4 px-20">
              <ProductReaction initialLiked={product.is_liked} />
              {/* Product Name + Subtitle */}
              <div className="flex-1">
                <ProductHeader name={product.name} />
              </div>{" "}
              {/* Wishlist */}
              {/* <WishlistSlider initialLiked={product.is_liked} /> */}
            </div>

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
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
            <div className="text-sm text-gray-300">Cart items: {cartCount}</div>
          </div>
        </div>
        {/* Review Section */}
        {/* <div>
          <ProductReview reviews={product.is_liked} />
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;

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
