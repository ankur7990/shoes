export const getProductImage = (product) => {
  // direct image field
  if (product?.image) {
    return product.image;
  }

  // nested product_images array
  if (product?.product_image?.length > 0) {
    return product.product_image;
  }

  // fallback image
  return "/placeholder.png";
};
