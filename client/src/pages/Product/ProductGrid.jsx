const ProductGrid = ({ products }) => {
  return (
    <div className="px-20 py-10">
      <h2 className="text-2xl font-semibold mb-5">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border rounded-xl p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-3 font-medium">{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
