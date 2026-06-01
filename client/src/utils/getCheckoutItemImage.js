const getCheckoutItemImage = (item) => {
  // 1) cart flow: direct image on item
  if (item?.product_image) {
    return item.product_image;
  }

  // 2) buy now flow: nested product_image
  if (item?.product?.product_image) {
    return item.product.product_image;
  }

  // 3) buy now flow: product_images as array
  if (Array.isArray(item?.product?.product_images)) {
    const first = item.product.product_images[0];
    if (typeof first === "string") return first;
    if (first?.image) return first.image;
  }

  // 4) product_images as object keyed by color
  if (
    item?.product?.product_images &&
    typeof item.product.product_images === "object" &&
    !Array.isArray(item.product.product_images)
  ) {
    const colorKey = item.color || item.product_color;
    const images = item.product.product_images[colorKey];
    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }
  }

  return "";
};
export default getCheckoutItemImage;
