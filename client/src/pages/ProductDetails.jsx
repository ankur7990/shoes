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
import { useParams, useNavigate } from "react-router-dom";
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
import toast from "react-hot-toast";
import { useCart } from "../context/cartContext";

const ProductDetails = () => {
  // console.log("product details loaded.");

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  // console.log("ID is:", id);
  // console.log("User is:", user);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
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
  const { fetchCart } = useCart();

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

        const productData = res.data.data || res.data;
        setProduct(productData);

        const firstColor =
          Object.keys(productData.product_images || {})[0] || "";
        setSelectedColor(firstColor);

        console.log("productData send to product details page", productData);
      } catch (error) {
        handleApiError(error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div className="pt-20 text-center text-white">Loading...</div>;
  }

  // const imageUrl = product?.image || product?.product_images?.[0]?.image;

  // const fetchCart = async () => {
  //   try {
  //     const response = await getCartItems();
  //     if (response?.data?.status) {
  //       setCartCount(response.data.items?.length || 0);
  //     }
  //   } catch (error) {
  //     console.log("Cart fetch error:", error);
  //   }
  // };

  // add to cart
  const handleAddToCart = async () => {
    // console.log("add to cart clicked.");

    try {
      if (!selectedSize) {
        toast.error("Please select a size first");
        return;
      }

      if (!user?.id) {
        toast.error("User not found");
        return;
      }

      setCartLoading(true);

      const cartRes = await getCartItems();
      // console.log("cart ID:", cartRes.data.results);

      const cartItems =
        cartRes.data.items || cartRes.data.results || cartRes.data || [];
      // console.log("cart items :", cartItems);
      setCartCount(cartItems.length);

      const existingItem = cartItems.find((item) => {
        return (
          Number(item.product) === Number(product.id) &&
          String(item.size) === String(selectedSize) &&
          String(item.product_color) === String(selectedColor)
        );
      });

      if (existingItem) {
        await updateCartItem(existingItem.id, {
          quantity: existingItem.quantity + 1,
        });
      } else {
        const cartObj = await addToCart({
          user: user.id,
          product: product.id,
          size: selectedSize,
          color: selectedColor,
          quantity: 1,
        });
        console.log("Add to cart:", cartObj);
      }

      // if (typeof fetchCartCount === "function") {
      //   await fetchCartCount();
      // }

      await fetchCart();

      toast.success("Added to cart");
      navigate("/cart");
    } catch (error) {
      handleApiError(error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleBuyNow = () => {
    try {
      if (!selectedSize) {
        toast.error("Please select a size first");
        return;
      }

      if (!selectedColor) {
        toast.error("Please select a color first");
        return;
      }

      navigate("/checkout", {
        state: {
          buyNowItem: {
            product: {
              id: product.id,
              name: product.name,
              brand: product.brand,
              price: product.price,
              description: product.description,
              product_images: product.product_images,
            },
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
          },
        },
      });
    } catch (error) {
      handleApiError(error);
    }
  };
  return (
    <div className="bg-gradient-layout-main min-h-screen px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Success Toast */}
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 rounded-2xl border border-[#43e77f] bg-black px-4 py-3 text-sm shadow-lg">
            {successMessage}
          </div>
        )}

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Side */}
          <div className="flex justify-center">
            <ProductImageGallery
              images={product.product_images?.[selectedColor] || []}
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Header + Like */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              {/* Like */}
              <div className="order-2 sm:order-1">
                <ProductReaction
                  liked={liked}
                  onToggle={handleToggleLike}
                  loading={loadingLike}
                />
              </div>

              {/* Header */}
              <div className="order-1 flex-1 sm:order-2">
                <ProductHeader
                  name={product.name}
                  brand={product.brand}
                  text={product.description}
                />
              </div>
            </div>

            {/* Price */}
            <ProductPrice price={product.price} />

            {/* Size */}
            <SizeSelector
              sizes={product.size || []}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />

            {/* Colors */}
            <ColorSelector
              colors={Object.keys(product.product_images || {})}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />

            {/* Description */}
            <ProductDescription text={product.description} />

            {/* Delivery */}
            <DeliveryReturns
              deliveryText={product.deliveryText}
              returnsText={product.returnsText}
            />

            {/* Buttons */}
            <ProductActions
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              cartLoading={cartLoading}
              selectedSize={selectedSize}
            />
          </div>
        </div>

        {/* Reviews */}
        {/* <div className="mt-12">
        <ProductReview />
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
