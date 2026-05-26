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
import {
  createProductLikes,
  deleteProductLikes,
  getProductById,
  getProductLikes,
} from "../api/productService";
import ProductReview from "./Product/ProductReview";
import ProductReaction from "./Product/ProductReaction";
import WishlistSlider from "./Product/ProductReaction";
import { addToCart, getCartItems, updateCartItem } from "../api/cartService";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // console.log("ID is:", id);
  // console.log("User is:", user);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [cartCount, setCartCount] = useState(0);
  const userId = user?.id;

  // handle like
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (!userId || !id) return;

        const res = await getProductLikes();
        const likes = res.data;

        const matchedLike = likes.find(
          (like) =>
            Number(like.user) === Number(userId) &&
            Number(like.product) === Number(id),
        );

        if (matchedLike) {
          setLiked(true);
          setLikeId(matchedLike.id);
        } else {
          setLiked(false);
          setLikeId(null);
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchLikes();
  }, [userId, id]);

  // handle toggle like
  const handleToggleLike = async () => {
    try {
      if (!userId) return;

      setLoadingLike(true);

      if (liked && likeId) {
        await deleteProductLikes(likeId);
        setLiked(false);
        setLikeId(null);
      } else {
        const res = await createProductLikes({
          user: userId,
          product: Number(id),
        });

        setLiked(true);
        setLikeId(res.data.id);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoadingLike(false);
    }
  };

  //passed product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);

        // depending on API shape
        // adjust this if backend wraps response in data.data
        const productData = res.data.data || res.data;
        setProduct(productData);
        // ✅ auto select first size
        if (productData.size?.length > 0) {
          setSelectedSize(productData.size[0]);
        }

        // console.log("productData send to product details page", productData);
        // console.log("brand:", productData.brand);
        // console.log("brand:", productData.name);

        // console.log("brand:", productData.description);

        // console.log("price:", productData.price);

        // console.log("brand:", productData.brand);

        // console.log("brand:", productData.brand);

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

  // add to cart
  const handleAddToCart = async () => {
    try {
      if (!selectedSize) {
        alert("Please select a size first");
        return;
      }

      setCartLoading(true);

      const cartRes = await getCartItems();
      const existingItem = cartRes.data.find(
        (item) =>
          Number(item.product) === Number(product.id) &&
          item.size === selectedSize,
      );

      if (existingItem) {
        await updateCartItem(existingItem.id, {
          quantity: existingItem.quantity + 1,
        });
      } else {
        await addToCart({
          user: user?.id,
          product: product.id,
          size: selectedSize,
          quantity: 1,
        });
      }

      alert("Added to cart");
    } catch (error) {
      handleApiError(error);
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
              <ProductReaction
                liked={liked}
                onToggle={handleToggleLike}
                loading={loadingLike}
              />
              {/* Product Name + Subtitle */}
              <div className="flex-1">
                <ProductHeader
                  name={product.name}
                  brand={product.brand}
                  text={product.description}
                />
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
              cartLoading={cartLoading}
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
