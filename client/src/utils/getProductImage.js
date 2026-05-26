const getProductImage = (item) => {
  const product = item?.product || item;

  if (product?.image) {
    return product.image;
  }

  if (product?.product_images?.length > 0) {
    return product.product_images[0].image;
  }

  return "/placeholder.png";
};
export default getProductImage;
