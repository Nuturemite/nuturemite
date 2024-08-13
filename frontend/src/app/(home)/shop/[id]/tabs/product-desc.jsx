const ProductDesc = ({ product }) => (
    <div className="py-4">
      <h2 className="text-2xl font-medium">Product Description</h2>
      <p className="mt-4">{product?.description}</p>
    </div>
  );

  export default ProductDesc;