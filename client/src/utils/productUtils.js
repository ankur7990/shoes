export const getProductImage = (product) => {
  // direct image field
  if (product?.image) {
    return product.image;
  }

  // nested product_images array
  if (product?.product_images?.length > 0) {
    return product.product_images[0].image;
  }

  // fallback image
  return "/placeholder.png";
};
